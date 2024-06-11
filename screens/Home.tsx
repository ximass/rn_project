import { View, Text, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation } : RouterProps) => {
  return (
   <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Button onPress={() => navigation.navigate('Home')} title = "Home"/> */}
      <Button onPress={() => navigation.navigate('MovieForm')} title = "Open Movies Form"/>
      <Button onPress={() => navigation.navigate('MovieList')} title = "Open Movies List"/>
      <Button onPress={ () => FIREBASE_AUTH.signOut()} title = "Logout"/>
    </View>
    );
}

export default Home;

// export const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0f0f0;
// `;

// export const Title = styled.Text`
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 16px;
// `;