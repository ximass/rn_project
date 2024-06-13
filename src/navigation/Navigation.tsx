import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MovieForm from '../../screens/Movie/MovieForm';
import MovieList from '../../screens/Movie/MovieList';
import Home from '../../screens/Home';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createStackNavigator();

const InsideStack =  createNativeStackNavigator();

const Navigation: React.FC = () => {
    return (
        <InsideStack.Navigator>
        <InsideStack.Screen name="Home" component={Home} />
        <InsideStack.Screen name="MovieForm" component={MovieForm} />
        <InsideStack.Screen name="MovieList" component={MovieList} />
        </InsideStack.Navigator>
    );
};

export default Navigation;
