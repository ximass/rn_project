import React from 'react';
import { SidebarData } from './SidebarData';
import { useNavigation } from '@react-navigation/native';
import {
  SidebarContainer,
  SidebarItem,
  SidebarIcon,
  SidebarText,
} from '../styles/Sidebar.styles';

const Sidebar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SidebarContainer>
      {SidebarData.map((item, index) => (
        <SidebarItem
          key={index}
          //@ts-ignore
          onPress={() => navigation.navigate(item.path)}
        >
          <SidebarIcon>{item.icon}</SidebarIcon>
          <SidebarText>{item.title}</SidebarText>
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
