import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useState } from 'react';
//@ts-ignore
import { Container, Title, TextInput, Button, ButtonText, ErrorText } from '../../styles/Form.styles.js';
import { useNavigation } from '@react-navigation/native';

const CategoryForm = () => {
    const navigation                    = useNavigation();
    
    const [name, setTitle]              = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors]           = useState<{name?: string, description?: string, imageUri?: string}>({});

    const fb = initializeApp(FIREBASE_CONFIG);
    const db = initializeFirestore(fb, {});

    const validate = () => {
        const newErrors: {name?: string, description?: string} = {};

        if (!name) {
            newErrors.name = 'Name is required';
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
            await addDoc(collection(db, "category"), {
                name,
                description
            });

            //@ts-ignore
            navigation.navigate('CategoryList');
        } catch (error) {
            console.error('Error saving to Firestore:', error);
        }
    };

    return (
        <Container>
            <Title>Category</Title>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => {
                    setTitle(text);
                    setErrors((prevErrors) => ({ ...prevErrors, name: undefined }));
                }}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(text) => {
                    setDescription(text);
                    setErrors((prevErrors) => ({ ...prevErrors, description: undefined }));
                }}
            />
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
            <Button onPress={handleRegister}>
                <ButtonText>Register</ButtonText>
            </Button>
        </Container>
    );
};

export default CategoryForm;
