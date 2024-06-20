import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal, TextInput, Button, Text, View, TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const LocationItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 8px;
  background-color: #e1dede;
  padding: 8px;
  border-radius: 2px;
  width: 80%;
`;

const LocationText = styled.Text`
  font-size: 18px;
`;

const DeleteIcon = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ModalButton = styled(TouchableOpacity)`
  background-color: #2196f3;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  flex: 1;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
`;

interface Location {
  id: string;
  title: string;
  description: string; // Adicionado campo description
}

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const fb = initializeApp(FIREBASE_CONFIG);
  const db = initializeFirestore(fb, {})

  const load = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'location'));
      const locationsData: Location[] = [];

      querySnapshot.forEach((doc) => {
        locationsData.push({ id: doc.id, ...doc.data() } as Location);
      });

      setLocations(locationsData);
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'location', id));
      setLocations((prevLocations) => prevLocations.filter(location => location.id !== id));
    } catch (error) {
      console.error('Error deleting location: ', error);
    }
  };

  const editLocation = (location: Location) => {
    setSelectedLocation(location);
    setNewTitle(location.title);
    setNewDescription(location.description); // Preenche o campo description ao editar
    setModalVisible(true);
  };

  const updateLocation = async () => {
    if (selectedLocation) {
      try {
        await updateDoc(doc(db, 'location', selectedLocation.id), {
          title: newTitle,
          description: newDescription, // Atualiza o campo description
        });
        setLocations((prevLocations) =>
          prevLocations.map((location) =>
            location.id === selectedLocation.id ? { ...location, title: newTitle, description: newDescription } : location
          )
        );
        setModalVisible(false);
        setSelectedLocation(null);
      } catch (error) {
        console.error('Error updating location: ', error);
      }
    }
  };

  useEffect(() => {
    load();
  }, []);
  
  return (
    <Container>
      <Title>Locations</Title>
      {locations && locations.map((location) => (
        <LocationItem key={location.id} onPress={() => editLocation(location)}>
          <LocationText>{location.title}</LocationText>
          <DeleteIcon onPress={() => deleteLocation(location.id)}>
            <Icon name="delete" size={24} color="black" />
          </DeleteIcon>
        </LocationItem>
      ))}
      {selectedLocation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{
              width: '80%',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}>
              <Title>Edit Location</Title>
              <TextInput
                placeholder="Title"
                value={newTitle}
                onChangeText={setNewTitle}
                style={{width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 10}}
              />
              <TextInput
                placeholder="Description"
                value={newDescription}
                onChangeText={setNewDescription}
                style={{width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 20}}
                multiline={true}
                numberOfLines={4}
              />
              <ButtonContainer>
                <ModalButton onPress={updateLocation}>
                  <ButtonText>Update</ButtonText>
                </ModalButton>
                <ModalButton onPress={() => setModalVisible(false)}>
                  <ButtonText>Cancel</ButtonText>
                </ModalButton>
              </ButtonContainer>
            </View>
          </View>
        </Modal>
      )}
    </Container>
  );
};

export default LocationList;
