import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MovieForm from '../../screens/Movie/MovieForm';
import MovieList from '../../screens/Movie/MovieList';
import Home from '../../screens/Home';
import Sidebar from '../../components/Sidebar';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Sidebar />
            
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MovieForm" component={MovieForm} />
                <Stack.Screen name="MovieList" component={MovieList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
