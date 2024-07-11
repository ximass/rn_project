import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 8px;
  background-color: #e1dede;
  padding: 8px;
  border-radius: 2px;
  width: 80%;
`;

export const Text = styled.Text`
  font-size: 18px;
`;

export const DeleteIcon = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
`;

export const ButtonContainer = styled.View`
  justify-content: space-between;
  width: 100%;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
`;

export const PickerContainer = styled.View`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: white;
`;