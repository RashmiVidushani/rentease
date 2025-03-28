import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login/login';
import globalStyles from './src/styles/main';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={globalStyles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={() => <Text>Home Screen</Text>} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
