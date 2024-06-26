import { addDoc, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
//@ts-ignore
import { Container, Title, TextInput, Button, ButtonText, ErrorText, PickerContainer } from '../../styles/Form.styles.js';
import { useNavigation } from '@react-navigation/native';
import { Image, Picker } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const LocationForm = () => {
    const navigation                              = useNavigation();
    const [title, setTitle]                       = useState('');
    const [description, setDescription]           = useState('');
    const [categories, setCategories]             = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [imageUri, setImageUri]                 = useState<string | null>(null);
    const [errors, setErrors]                     = useState<{title?: string, description?: string, imageUri?: string}>({});

    const fb = initializeApp(FIREBASE_CONFIG);
    const db = initializeFirestore(fb, {});

    const loadCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'category'));
            const categoriesData: any[] = [];
            querySnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, ...doc.data() });
            });
            setCategories(categoriesData);
        } catch (error) {
            console.error('Erro ao carregar categorias: ', error);
        }
    };

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
                imageUri,
                category: selectedCategory
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

    useEffect(() => {
        loadCategories();
    }, []);

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

            <PickerContainer>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={{ width: '100%', border: 'none' }}
                >
                    <Picker.Item label="Select a category" value="" />
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </PickerContainer>

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
