import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../FirebaseConfig";
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal, TextInput, Button, Text, View } from 'react-native';
import { Title, Container, Item, Text as ItemText, DeleteIcon, ButtonContainer, ModalButton, ButtonText } from '../../styles/List.styles.js';

interface Category {
  id: string;
  name: string;
  description: string;
}

const CategoryList: React.FC = () => {
  const [category, setCategories]               = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modalVisible, setModalVisible]         = useState(false);
  const [newName, setNewname]                   = useState('');
  const [newDescription, setNewDescription]     = useState('');

  const fb = initializeApp(FIREBASE_CONFIG);
  const db = initializeFirestore(fb, {})

  const load = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));
      const categoryData: Category[] = [];

      querySnapshot.forEach((doc) => {
        categoryData.push({ id: doc.id, ...doc.data() } as Category);
      });

      setCategories(categoryData);
    } catch (error) {
      console.error('Error loading category: ', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'category', id));
      setCategories((prevCategories) => prevCategories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  const editCategory = (category: Category) => {
    setSelectedCategory(category);
    setNewname(category.name);
    setNewDescription(category.description);
    setModalVisible(true);
  };

  const updateCategory = async () => {
    if (selectedCategory) {
      try {
        await updateDoc(doc(db, 'category', selectedCategory.id), {
          name: newName,
          description: newDescription
        });
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === selectedCategory.id ? { ...category, name: newName, description: newDescription } : category
          )
        );
        setModalVisible(false);
        setSelectedCategory(null);
      } catch (error) {
        console.error('Error updating category: ', error);
      }
    }
  };

  useEffect(() => {
    load();
  }, []);
  
  return (
    <Container>
      <Title>Categories</Title>
      {category && category.map((category) => (
        <Item key={category.id} onPress={() => editCategory(category)}>
          <ItemText>{category.name}</ItemText>
          <DeleteIcon onPress={() => deleteCategory(category.id)}>
            <Icon name="delete" size={24} color="black" />
          </DeleteIcon>
        </Item>
      ))}
      {selectedCategory && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{
              width: '80%',
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
              <Title>Edit Category</Title>
              <TextInput
                placeholder="Name"
                value={newName}
                onChangeText={setNewname}
                style={{width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 10}}
              />
              <TextInput
                placeholder="Description"
                value={newDescription}
                onChangeText={setNewDescription}
                style={{width: '100%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 20}}
                multiline={true}
                numberOfLines={4}
              />
              <ButtonContainer>
                <ModalButton onPress={updateCategory}>
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

export default CategoryList;
