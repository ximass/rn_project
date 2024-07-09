import React, { useState, useEffect } from 'react'; 
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import { collection, onSnapshot } from "firebase/firestore"; 
import { FIREBASE_DB } from "../../FirebaseConfig"; 
import LocationForm from '../Location/LocationForm'; 

const Maps = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'location'), (querySnapshot) => {
      const locationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locationsData);
    }, (error) => {
      console.error("Erro ao buscar localizações: ", error);
    });

    // Cleanup subscription on unmount
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
    closeModal();  // Fecha o modal do formulário
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
        onPress={handlePress}
      >
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

      {/* Modal para exibir informações do marcador */}
      {selectedLocation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedLocation}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Botão para fechar o modal */}
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>

              {/* Exibe as informações do marcador selecionado */}
              <Text style={styles.title}>{selectedLocation.title}</Text>
              <Text style={styles.description}>{selectedLocation.description}</Text>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para exibir o formulário de cadastro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Botão para fechar o modal */}
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Fechar</Text>
            </TouchableOpacity>

            {/* Renderiza o formulário de cadastro de localização */}
            <LocationForm
              initialCoordinate={coordinate}
              onClose={handleLocationFormClose}  // Passa a função de callback
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
});

export default Maps;
