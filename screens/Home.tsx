import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  return (
    <LinearGradient 
      colors={['#0000ff', '#000000']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo ao Find!</Text>
        </View>
        <Image source={require('../assets/find.png')} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.quote}>
              Com o Find, você pode cadastrar suas localizações favoritas e acessá-las facilmente!
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.version}>Versão 1.0.0</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#ffffff',
  },
  summary: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    color: '#ffffff',
  },
  footer: {
    marginBottom: 20,
  },
  version: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default Home;
