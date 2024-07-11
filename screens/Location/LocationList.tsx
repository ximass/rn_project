import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal, TextInput, Text, View, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Title, Container, Item, Text as ItemText, DeleteIcon, ButtonContainer, ModalButton, ButtonText, PickerContainer } from '../../styles/List.styles.js';
import { Picker } from '@react-native-picker/picker';

interface Location {
	id: string;
	title: string;
	description: string;
	latitude?: number;
	longitude?: number;
	category?: string;
	imageUri?: string;
}

const LocationList: React.FC = () => {
	const [locations, setLocations] = useState<Location[]>([]);
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [newLatitude, setNewLatitude] = useState<string | null>(null);
	const [newLongitude, setNewLongitude] = useState<string | null>(null);
	const [newCategory, setNewCategory] = useState<string | null>(null);
	const [newImageUri, setNewImageUri] = useState<string | null>(null);
	const [categories, setCategories] = useState<any[]>([]);
	
	const fb = initializeApp(FIREBASE_CONFIG);
	const db = initializeFirestore(fb, {});
	
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'location'), (querySnapshot) => {
			const locationsData: Location[] = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				locationsData.push({
					id: doc.id,
					title: data.title,
					description: data.description,
					latitude: data.latitude,
					longitude: data.longitude,
					category: data.category,
					imageUri: data.imageUri
				});
			});
			setLocations(locationsData);
		}, (error) => {
			console.error('Error loading locations: ', error);
		});
		
		return () => unsubscribe();
	}, []);
	
	useEffect(() => {
		const loadCategories = async () => {
			console.log('entrou carregamento categorias');
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
		
		loadCategories();
	}, []);
	
	const deleteLocation = async (id: string) => {
		try {
			await deleteDoc(doc(db, 'location', id));
			setLocations((prevLocations) => prevLocations.filter(location => location.id !== id));
		} catch (error) {
			console.error('Error deleting location: ', error);
		}
	};
	
	const editLocation = (location: Location) => {
		setSelectedLocation(location);
		setNewTitle(location.title);
		setNewDescription(location.description);
		setNewLatitude(location.latitude !== undefined ? location.latitude.toString() : null);
		setNewLongitude(location.longitude !== undefined ? location.longitude.toString() : null);
		setNewCategory(location.category || null);
		setNewImageUri(location.imageUri || null);
		setModalVisible(true);
	};
	
	const updateLocation = async () => {
		if (selectedLocation) {
			try {
				await updateDoc(doc(db, 'location', selectedLocation.id), {
					title: newTitle,
					description: newDescription,
					latitude: parseFloat(newLatitude),
					longitude: parseFloat(newLongitude),
					category: newCategory,
					imageUri: newImageUri,
				});
				setLocations((prevLocations) =>
					prevLocations.map((location) =>
						location.id === selectedLocation.id ? 
						{
							...location,
							title: newTitle,
							description: newDescription,
							latitude: parseFloat(newLatitude),
							longitude: parseFloat(newLongitude),
							category: newCategory,
							imageUri: newImageUri
						} 
						: location
			)
		);
		setModalVisible(false);
		setSelectedLocation(null);
	} catch (error) {
		console.error('Error updating location: ', error);
	}
}
};

const pickImage = async () => {
	const results = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		quality: 1,
	});
	
	//@ts-ignore
	if (!results.cancelled) {
		setNewImageUri(results.assets[0].uri);
	}
};

const takePhoto = async () => {
	const result = await ImagePicker.launchCameraAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		quality: 1,
	});
	
	//@ts-ignore
	if (!result.cancelled) {
		setNewImageUri(result.assets[0].uri);
	}
};

const removeImage = () => {
	setNewImageUri(null);
};

return (
	<Container>
	<Title>Locations</Title>
	{locations && locations.map((location) => (
		<Item key={location.id} onPress={() => editLocation(location)}>
			<ItemText>{location.title}</ItemText>
			<DeleteIcon onPress={() => deleteLocation(location.id)}>
				<Icon name="delete" size={24} color="black" />
			</DeleteIcon>
		</Item>
	))}
	{selectedLocation && (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<View style={{
				width: '80%',
				maxHeight: '80%',
				backgroundColor: 'white',
				padding: 20,
				borderRadius: 10,
				alignItems: 'center',
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.8,
				shadowRadius: 2,
				elevation: 5,
				}}>
					<Title>Edit Location</Title>
					<ScrollView style={{ width: '100%' }}>
						<TextInput
						placeholder="Title"
						value={newTitle}
						onChangeText={setNewTitle}
						style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 10 }}
						/>
						<TextInput
						placeholder="Description"
						value={newDescription}
						onChangeText={setNewDescription}
						style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 20 }}
						multiline={true}
						numberOfLines={4}
						/>
						{newLatitude !== null && (
							<TextInput
							placeholder="Latitude"
							value={newLatitude}
							onChangeText={setNewLatitude}
							style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 10 }}
							/>
						)}
						{newLongitude !== null && (
							<TextInput
							placeholder="Longitude"
							value={newLongitude}
							onChangeText={setNewLongitude}
							style={{ width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 20 }}
							/>
						)}
						<PickerContainer>
							<Picker
								selectedValue={newCategory}
								onValueChange={(itemValue) => setNewCategory(itemValue)}
								//@ts-ignore
								style={{ width: '100%', border: 'none' }}
								>
								<Picker.Item label="Select a category" value="" />
								{categories.map((category) => (
									<Picker.Item key={category.id} label={category.name} value={category.id} />
								))}
							</Picker>
						</PickerContainer>
						{newImageUri && (
							<>
								<Image source={{ uri: newImageUri }} style={{ width: 200, height: 200, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', marginBottom: 20 }} />
								<ModalButton onPress={removeImage} style={{ marginBottom: 20, backgroundColor: '#ff6b6b' }}>
									<ButtonText>Remove Photo</ButtonText>
								</ModalButton>
							</>
						)}
					</ScrollView>
					<ButtonContainer>
						<ModalButton onPress={pickImage} style={{ backgroundColor: '#4b6a9c' }}>
							<ButtonText>Choose a photo</ButtonText>
						</ModalButton>
						<ModalButton onPress={takePhoto} style={{ backgroundColor: '#4b6a9c' }}>
							<ButtonText>Take a photo</ButtonText>
						</ModalButton>
						<ModalButton onPress={updateLocation}>
							<ButtonText>Update</ButtonText>
						</ModalButton>
						<ModalButton onPress={() => setModalVisible(false)}>
							<ButtonText>Cancel</ButtonText>
						</ModalButton>
					</ButtonContainer>
				</View>
			</View>
		</Modal>
	)}
	</Container>
);
};

export default LocationList;
