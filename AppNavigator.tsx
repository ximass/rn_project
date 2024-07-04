import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Home';
import LocationForm from './screens/Location/LocationForm';
import LocationList from './screens/Location/LocationList';
import CategoryForm from './screens/Category/CategoryForm';
import CategoryList from './screens/Category/CategoryList';
import Sidebar from './components/Sidebar';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="LocationForm" component={LocationForm} />
        <Drawer.Screen name="LocationList" component={LocationList} />
        <Drawer.Screen name="CategoryForm" component={CategoryForm} />
        <Drawer.Screen name="CategoryList" component={CategoryList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
