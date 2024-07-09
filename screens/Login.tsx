import { View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Image, Dimensions, ScrollView } from "react-native";
import React, { useState } from 'react';
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { TextInput, Button, ButtonText } from "../styles/Form.styles";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } 
        catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } 
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Create account!');
        } 
        catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <LinearGradient 
            colors={['#0000ff', '#ffffff']} 
            style={styles.container}
        >
            <KeyboardAvoidingView 
                behavior="padding" 
                style={styles.keyboardView} 
                keyboardVerticalOffset={50} // Ajuste conforme necessário
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image source={require('../assets/find.png')} style={styles.logo} />
                    <Text style={styles.title}>Welcome</Text>
                    <TextInput 
                        value={email} 
                        style={styles.input} 
                        placeholder="Email" 
                        autoCapitalize="none" 
                        onChangeText={(text) => setEmail(text)} 
                    />
                    <TextInput 
                        secureTextEntry 
                        value={password} 
                        style={styles.input} 
                        placeholder="Password" 
                        autoCapitalize="none" 
                        onChangeText={(text) => setPassword(text)} 
                    />
                    
                    { loading ? (
                        <ActivityIndicator size="large" color="#ffffff" /> 
                    ) : ( 
                    <> 
                        <Button onPress={signIn} style={styles.button}>
                            <ButtonText>Login</ButtonText>
                        </Button>

                        <Button onPress={signUp} style={[styles.button, { marginTop: 10 }]}>
                            <ButtonText>Create Account</ButtonText>
                        </Button>
                    </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    keyboardView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.5,  // 50% da largura da tela
        height: height * 0.2, // 20% da altura da tela
        marginBottom: 20,
        resizeMode: 'contain', // ajusta a imagem ao espaço disponível
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#ffffff",
    },
    input: {
        width: '100%',
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
