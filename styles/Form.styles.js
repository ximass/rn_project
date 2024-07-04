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

//Add the margin-top via component props
export const Button = styled.TouchableOpacity.attrs(props => props)`
  background-color: #007bff;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  margin-top: ${props => props.marginTop ? `${props.marginTop}px` : 0};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 8px;
`;

export const PickerContainer = styled.View`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: white;
`;