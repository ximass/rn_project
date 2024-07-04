import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import MapView from 'react-native-maps';

const Maps = () => { 
  return ( 
  <View style = {styles.container}> 
    <MapView style = {styles.map} /> 
    </View> 
    ); 
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  map: {
    flex: 1,
  },
});

export default Maps;