import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/Login/Login";
import RenterHome from "./src/components/RenterHome/RenterHome";
import OwnerHome from "./src/components/OwnerHome/OwnerHome";
import Register from "./src/components/Register/Register";
import Listing from "./src/components/Listing/Listing";
import { SafeAreaView } from "react-native-safe-area-context";


const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>

   
    <NavigationContainer>
      <Stack.Navigator
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
            gestureEnabled: false,
            title: "",
            headerTintColor:"#fff",
            headerStyle: {
              backgroundColor: "#2A2A2A",
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
        <Stack.Screen name="Listing" component={Listing} 
        options={{
          title: "Listing details",
          headerBackTitle: "",
          headerBackTitleStyle: {
            color: "#fff",
            fontFamily: "Roboto",
            fontSize: 18,
          },
          headerStyle: { 
            height: 60,
            backgroundColor: "#121212" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            height: 30,
            color: "#fff",
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "bold",
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
  
};

export default App;
