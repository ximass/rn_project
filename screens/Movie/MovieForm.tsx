import React, { useState } from 'react';
//@ts-ignore
import { Container, Title, TextInput, Button, ButtonText } from '../../styles/Form.styles.js';
import { useNavigation } from '@react-navigation/native';

const MovieForm = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');

    const handleRegister = () => {
        //@ts-ignore
        navigation.navigate('MovieList');
    };

    return (
        <Container>
            <Title>Movie Registration</Title>
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
            <TextInput
                placeholder="Release Year"
                value={releaseYear}
                onChangeText={setReleaseYear}
            />
            <Button onPress={handleRegister}>
                <ButtonText>Register</ButtonText>
            </Button>
        </Container>
    );
};

export default MovieForm;
