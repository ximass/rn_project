import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Home: React.FC = () => {
  return (
    <View>
      <Text>Welcome to My App!</Text>
    </View>
  );
};

export default Home;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;