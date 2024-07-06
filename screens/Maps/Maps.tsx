import React, { useState } from 'react'; 
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import LocationForm from '../Location/LocationForm'; // Importe seu formulário de cadastro de localização aqui

const Maps = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });

  const handlePress = (event) => {
    // Captura a coordenada do clique no mapa
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordinate({ latitude, longitude });

    // Abre o modal para cadastrar a localização
    setModalVisible(true);
  };

  const closeModal = () => {
    // Fecha o modal e limpa as coordenadas
    setModalVisible(false);
    setCoordinate({ latitude: 0, longitude: 0 });
  };

  return ( 
    <View style={styles.container}> 
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: -29.436624,
          longitude: -51.949283,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handlePress}
      >
        <Marker
          coordinate={coordinate}
          title="Cadastrar nova localização aqui"
          description="Toque para adicionar"
        />
      </MapView>

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
              initialCoordinate={coordinate} // Passa a coordenada inicial para o formulário
              onClose={closeModal} // Passa a função para fechar o modal
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
});

export default Maps;
