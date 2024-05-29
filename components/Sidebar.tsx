// src/components/Sidebar.tsx
import React from 'react';
import { SidebarData } from './SidebarData';
import { useNavigation } from '@react-navigation/native';

const Sidebar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <div>
      {SidebarData.map((item, index) => (
        // @ts-ignore
        <div key={index} onClick={() => navigation.navigate(item.path)}>
          {item.icon} {item.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
