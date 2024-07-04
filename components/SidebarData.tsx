import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SidebarData = [
    { title: 'Home', path: 'Home', icon: <Icon name="home" size={20} /> },
    { title: 'Location', path: 'LocationForm', icon: <Icon name="crosshairs" size={20} /> },
    { title: 'Locations', path: 'LocationList', icon: <Icon name="list" size={20} /> },
    { title: 'Category', path: 'CategoryForm', icon: <Icon name="table" size={20} /> },
    { title: 'Categories', path: 'CategoryList', icon: <Icon name="list" size={20} /> },
];