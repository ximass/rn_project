import React from 'react';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SidebarData } from './SidebarData';
import { useNavigation } from '@react-navigation/native';
import {
  SidebarContainer,
  SidebarItem,
  SidebarIcon,
  SidebarText,
} from '../styles/Sidebar.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sidebar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView>
      <SidebarContainer>
        {SidebarData.map((item, index) => (
          <DrawerItem
            key={index}
            label={() => (
              <SidebarItem>
                <SidebarIcon>{item.icon}</SidebarIcon>
                <SidebarText>{item.title}</SidebarText>
              </SidebarItem>
            )}
            onPress={() => navigation.navigate(item.path)}
          />
        ))}
        <DrawerItem
          key='logout'
          label={() => (
            <SidebarItem>
              <SidebarIcon><Icon name="sign-out" size={20} color="black" /></SidebarIcon>
              <SidebarText>Logout</SidebarText>
            </SidebarItem>
          )}
          onPress={ () => FIREBASE_AUTH.signOut()}
          />
      </SidebarContainer>
    </DrawerContentScrollView>
  );
};

export default Sidebar;
