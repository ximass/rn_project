import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import MovieForm from "./screens/Movie/MovieForm";
import MovieList from "./screens/Movie/MovieList";
import Home from "./screens/Home";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack =  createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home} />
      <InsideStack.Screen name="MovieForm" component={MovieForm} />
      <InsideStack.Screen name="MovieList" component={MovieList} />
    </InsideStack.Navigator>
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
      <Stack.Navigator initialRouteName="Login">
        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={ {headerShown: false}} /> : <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>}
      </Stack.Navigator>
   </NavigationContainer>
  );
}