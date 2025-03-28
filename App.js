import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/Login/Login";
import RenterHome from "./src/components/RenterHome/RenterHome";
import OwnerHome from "./src/components/OwnerHome/OwnerHome";
import Register from "./src/components/Register/Register";
import Listing from "./src/components/Listing/Listing";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="OwnerHome"
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" 
        options={{ headerShown: false,
         
        }}>
          {(props) => (
            <Login
              {...props}
              buttonLabel="Login"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RenterHome" component={RenterHome} options={
          {headerShown: false,}
        }>
        </Stack.Screen>
        <Stack.Screen name="OwnerHome" component={OwnerHome} options={
          {headerShown: false,}
        }></Stack.Screen>
        <Stack.Screen name="Register" component={Register}
        options={
          {
            title: "",
            headerTintColor:"#fff",
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTitleStyle: {
              fontFamily: "Roboto",
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
            },
          }
        }
        >
          
          </Stack.Screen>
        <Stack.Screen name="Listing" component={Listing} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
