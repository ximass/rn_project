import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Alert, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import LocationForm from '../Location/LocationForm';

const Maps = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocationPermission();

    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'location'), async (querySnapshot) => {
      const locationsPromises = querySnapshot.docs.map(async (documentSnapshot) => {
        const locationData = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        };

        //@ts-ignore
        const categoryRef = doc(FIREBASE_DB, 'category', locationData.category);
        const categorySnap = await getDoc(categoryRef);

        if (categorySnap.exists()) {
          //@ts-ignore
          locationData.category = categorySnap.data().name;
        } else {
          console.error("Categoria não encontrada");
        }

        return locationData;
      });
    
      // Aguarda todas as buscas das categorias serem concluídas
      const locationsData = await Promise.all(locationsPromises);

      setLocations(locationsData);
    }, (error) => {
      console.error("Erro ao buscar localizações: ", error);
    });

    return () => unsubscribe();
  }, []);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordinate({ latitude, longitude });
    setModalVisible(true);
  };

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCoordinate({ latitude: 0, longitude: 0 });
    setSelectedLocation(null);
  };

  const handleLocationFormClose = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -29.46014087686257,
          longitude: -51.967566898546664,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={currentLocation ? {
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : undefined}
        onPress={handlePress}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
            pinColor="blue"
          />
        )}
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            description={location.description}
            onPress={() => handleMarkerPress(location)}
          />
        ))}
      </MapView>

      {selectedLocation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedLocation}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{selectedLocation.title}</Text>
              <Text style={styles.description}>{selectedLocation.description}</Text>
              {selectedLocation.category && (
                  <Text style={styles.category}>Category: {selectedLocation.category}</Text>
                )}
                {selectedLocation.imageUri && (
                  <Image
                    source={{ uri: selectedLocation.imageUri }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
            </View>
          </View>
        </Modal>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Fechar</Text>
            </TouchableOpacity>
            <LocationForm
              initialCoordinate={coordinate}
              onClose={handleLocationFormClose}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxWidth: 400,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  category: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
});

export default Maps;
