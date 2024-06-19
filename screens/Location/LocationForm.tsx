import React, { useState } from 'react';
//@ts-ignore
import { Container, Title, TextInput, Button, ButtonText } from '../../styles/Form.styles.js';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const LocationForm = () => {
    const navigation                    = useNavigation();
    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [imageUri, setImageUri]       = useState<string | null>(null);

    const handleRegister = () => {
        //@ts-ignore
        navigation.navigate('LocationList');
    };

    const pickImage = async () => {
        const results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
      
        if (!results.canceled) {
          setImageUri(results.assets[0].uri);
        }
      };
      

    return (
        <Container>
            <Title>Location</Title>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button onPress={pickImage} style={{marginBottom: 20}}>
                <ButtonText>Choose a photo</ButtonText>
            </Button>
            
            {
                imageUri 
                && (
                    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
                )
            }

            <Button onPress={handleRegister}>
                <ButtonText>Register</ButtonText>
            </Button>
        </Container>
    );
};

export default LocationForm;
