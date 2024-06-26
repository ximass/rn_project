import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LocationForm from '../../screens/Location/LocationForm';
import LocationList from '../../screens/Location/LocationList';
import CategoryForm from '../../screens/Category/CategoryForm';
import CategoryList from '../../screens/Category/CategoryList';
import Home from '../../screens/Home';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createStackNavigator();

const InsideStack =  createNativeStackNavigator();

const Navigation: React.FC = () => {
    return (
        <InsideStack.Navigator>
        <InsideStack.Screen name="Home" component={Home} />
        <InsideStack.Screen name="LocationForm" component={LocationForm} />
        <InsideStack.Screen name="LocationList" component={LocationList} />
        <InsideStack.Screen name="CategoryForm" component={CategoryForm} />
        <InsideStack.Screen name="CategoryList" component={CategoryList} />
        </InsideStack.Navigator>
    );
};

export default Navigation;
