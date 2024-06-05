import React from 'react';
import Navigation from './src/navigation/Navigation';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyASCAMsn8G_aQmf2KOGq4PDDstwW1Y_KNw",
  authDomain: "rn-expo-bb825.firebaseapp.com",
  projectId: "rn-expo-bb825",
  storageBucket: "rn-expo-bb825.appspot.com",
  messagingSenderId: "521281768358",
  appId: "1:521281768358:web:e4da10ed6c75cd4ae35d67"
};

const firebase = initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <Navigation />
  );
};

export default App;
