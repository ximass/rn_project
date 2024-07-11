import { addDoc, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
//@ts-ignore
import { Container, Title, TextInput, Button, ButtonText, ErrorText, PickerContainer } from '../../styles/Form.styles.js';
import { useNavigation } from '@react-navigation/native';
import { Image, View, StyleSheet, ScrollView, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const LocationForm = ({ initialCoordinate, onClose }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ title?: string, description?: string, imageUri?: string }>({});

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
        const newErrors: { title?: string, description?: string, imageUri?: string } = {};

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
            const data: { title: string, description: string, imageUri: string, category: string, latitude?: number, longitude?: number } = {
                title,
                description,
                imageUri,
                category: selectedCategory
            };

            if (initialCoordinate && initialCoordinate.latitude && initialCoordinate.longitude) {
                data.latitude = initialCoordinate.latitude;
                data.longitude = initialCoordinate.longitude;
            }

            await addDoc(collection(db, "location"), data);

            if (onClose) {
                onClose();
            }

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

        //@ts-ignore
        if (!results.cancelled) {
            setImageUri(results.assets[0].uri);
            setErrors((prevErrors) => ({ ...prevErrors, imageUri: undefined }));
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        //@ts-ignore
        if (!result.cancelled) {
            setImageUri(result.assets[0].uri);
            setErrors((prevErrors) => ({ ...prevErrors, imageUri: undefined }));
        }
    };

    const removeImage = () => {
        setImageUri(null);
        setErrors((prevErrors) => ({ ...prevErrors, imageUri: undefined }));
    };

    const getPermissionsAsync = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
          Alert.alert('Sorry, we need camera and media library permissions to make this work!');
        }
      };

    useEffect(() => {
        loadCategories();
        getPermissionsAsync();
    }, []);

    return (
        <ScrollView>
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
                        //@ts-ignore
                        style={{ width: '100%', border: 'none' }}
                    >
                        <Picker.Item label="Select a category" value="" />
                        {categories.map((category) => (
                            <Picker.Item key={category.id} label={category.name} value={category.id} />
                        ))}
                    </Picker>
                </PickerContainer>

                {imageUri && (
                    <>
                        <Title>Image</Title>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        </View>
                        <Button onPress={removeImage} style={{ marginBottom: 20, backgroundColor: '#ff6b6b' }}>
                            <ButtonText>Remove Photo</ButtonText>
                        </Button>
                    </>
                )}

                <Button onPress={pickImage} style={{ marginBottom: 10, backgroundColor: '#4b6a9c' }}>
                    <ButtonText>Choose a photo</ButtonText>
                </Button>
                <Button onPress={takePhoto} style={{ marginBottom: 20, backgroundColor: '#4b6a9c' }}>
                    <ButtonText>Take a photo</ButtonText>
                </Button>
                <Button onPress={handleRegister}>
                    <ButtonText>Register</ButtonText>
                </Button>
            </Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
    },
});

export default LocationForm;
