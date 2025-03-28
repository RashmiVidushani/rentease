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
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <Login
              {...props}
              title="Welcome to RentItRight"
              buttonLabel="Login"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RenterHome" component={RenterHome} />
        <Stack.Screen name="OwnerHome" component={OwnerHome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Listing" component={Listing} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
