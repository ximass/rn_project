import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useState } from 'react';
//@ts-ignore
import { Container, Title, TextInput, Button, ButtonText, ErrorText } from '../../styles/Form.styles.js';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const LocationForm = () => {
    const navigation                    = useNavigation();
    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri]       = useState<string | null>(null);
    const [errors, setErrors]           = useState<{title?: string, description?: string, imageUri?: string}>({});

    const fb = initializeApp(FIREBASE_CONFIG);
    const db = initializeFirestore(fb, {});

    const validate = () => {
        const newErrors: {title?: string, description?: string, imageUri?: string} = {};

        if (!title) {
            newErrors.title = 'Title is required';
        }

        if (!description) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) {
            return;
        }

        try {
            await addDoc(collection(db, "location"), {
                title,
                description,
                imageUri
            });

            //@ts-ignore
            navigation.navigate('LocationList');
        } catch (error) {
            console.error('Error saving to Firestore:', error);
        }
    };

    const pickImage = async () => {
        const results = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
      
        if (!results.canceled) {
            setImageUri(results.assets[0].uri);
            setErrors((prevErrors) => ({ ...prevErrors, imageUri: undefined }));
        }
    };

    return (
        <Container>
            <Title>Location</Title>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => {
                    setTitle(text);
                    setErrors((prevErrors) => ({ ...prevErrors, title: undefined }));
                }}
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(text) => {
                    setDescription(text);
                    setErrors((prevErrors) => ({ ...prevErrors, description: undefined }));
                }}
            />
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
            <Button onPress={pickImage} style={{ marginBottom: 20 }}>
                <ButtonText>Choose a photo</ButtonText>
            </Button>
            {imageUri && (
                <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
            )}
            <Button onPress={handleRegister}>
                <ButtonText>Register</ButtonText>
            </Button>
        </Container>
    );
};

export default LocationForm;
