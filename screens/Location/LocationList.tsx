import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal, TextInput, Button, Text, View } from 'react-native';
import { Title, Container, Item, Text as ItemText, DeleteIcon, ButtonContainer, ModalButton, ButtonText } from '../../styles/List.styles.js';

interface Location {
  id: string;
  title: string;
  description: string;
  latitude?: number; // torna latitude e longitude opcionais
  longitude?: number;
}

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLatitude, setNewLatitude] = useState<string | null>(null);
  const [newLongitude, setNewLongitude] = useState<string | null>(null);

  const fb = initializeApp(FIREBASE_CONFIG);
  const db = initializeFirestore(fb, {});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'location'), (querySnapshot) => {
      const locationsData: Location[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        locationsData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude
        });
      });
      setLocations(locationsData);
    }, (error) => {
      console.error('Error loading locations: ', error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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
    setNewDescription(location.description);
    setNewLatitude(location.latitude !== undefined ? location.latitude.toString() : null); // define null se latitude não existir
    setNewLongitude(location.longitude !== undefined ? location.longitude.toString() : null); // define null se longitude não existir
    setModalVisible(true);
  };

  const updateLocation = async () => {
    if (selectedLocation && newLatitude !== null && newLongitude !== null) {
      try {
        await updateDoc(doc(db, 'location', selectedLocation.id), {
          title: newTitle,
          description: newDescription,
          latitude: parseFloat(newLatitude),
          longitude: parseFloat(newLongitude),
        });
        setLocations((prevLocations) =>
          prevLocations.map((location) =>
            location.id === selectedLocation.id ? {
              ...location,
              title: newTitle,
              description: newDescription,
              latitude: parseFloat(newLatitude),
              longitude: parseFloat(newLongitude)
            } : location
          )
        );
        setModalVisible(false);
        setSelectedLocation(null);
      } catch (error) {
        console.error('Error updating location: ', error);
      }
    }
  };

  return (
    <Container>
      <Title>Locations</Title>
      {locations && locations.map((location) => (
        <Item key={location.id} onPress={() => editLocation(location)}>
          <ItemText>{location.title}</ItemText>
          <DeleteIcon onPress={() => deleteLocation(location.id)}>
            <Icon name="delete" size={24} color="black" />
          </DeleteIcon>
        </Item>
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
                style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 10 }}
              />
              <TextInput
                placeholder="Description"
                value={newDescription}
                onChangeText={setNewDescription}
                style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 20 }}
                multiline={true}
                numberOfLines={4}
              />
              {newLatitude !== null && ( // Renderiza apenas se newLatitude não for null
                <TextInput
                  placeholder="Latitude"
                  value={newLatitude}
                  onChangeText={setNewLatitude}
                  style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 10 }}
                />
              )}
              {newLongitude !== null && ( // Renderiza apenas se newLongitude não for null
                <TextInput
                  placeholder="Longitude"
                  value={newLongitude}
                  onChangeText={setNewLongitude}
                  style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 20 }}
                />
              )}
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
