import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import MovieForm from "./screens/Movie/MovieForm";
import MovieList from "./screens/Movie/MovieList";
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
          <Stack.Screen name="MovieForm" component={MovieForm} />
          <Stack.Screen name="MovieList" component={MovieList} />
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