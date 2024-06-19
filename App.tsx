import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import LocationForm from "./screens/Location/LocationForm";
import LocationList from "./screens/Location/LocationList";
import Home from "./screens/Home";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Sidebar from "./components/Sidebar";

const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LocationForm" component={LocationForm} />
          <Stack.Screen name="LocationList" component={LocationList} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  return (
   <NavigationContainer>

      {user ? <Sidebar /> : <></>}
      
      <Stack.Navigator initialRouteName="Login">
        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={ {headerShown: false}} /> : <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>}
      </Stack.Navigator>
   </NavigationContainer>
  );
}