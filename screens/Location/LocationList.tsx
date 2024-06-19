import React from 'react';
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

const LocationList: React.FC = () => {
  const Locations = ['Location 1', 'Location 2', 'Location 3']; // Exemplo de dados da lista

  return (
    <Container>
      <Title>Locations</Title>
      {Locations.map((Location, index) => (
        <LocationItem key={index}>{Location}</LocationItem>
      ))}
    </Container>
  );
};

export default LocationList;
