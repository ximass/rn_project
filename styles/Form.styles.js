import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const TextInput = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
