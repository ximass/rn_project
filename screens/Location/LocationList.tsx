import { addDoc, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore'

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const LocationItem = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
  background-color: #e1dede;
  padding: 8px;
  border-radius: 2px;
  width: 80%;
`;

interface Location {
  title: string;
}

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  
  const fb = initializeApp(FIREBASE_CONFIG);
  const db = initializeFirestore(fb, {})

  const load = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'location'));
      const locationsData: Location[] = [];

      querySnapshot.forEach((doc) => {
        locationsData.push(doc.data() as Location);
      });

      setLocations(locationsData);
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  };

  useEffect(() => {
    load();
  }, []);
  
  return (
    <Container>
        <Title>Locations</Title>
        {locations && locations.map((location, index) => (
            <LocationItem key={index}>{location.title}</LocationItem>
        ))}
    </Container>
  );
};

export default LocationList;
