import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";
import CreateListing from "./CreateListing/CreateListing";
import CurrentListings from "./CurrentListings/CurrentListings";
import Settings from "./Settings/Settings";
import Profile from "./Profile/profile";

const Tab = createBottomTabNavigator();

const OwnerScreen = () => {
  return (
    
    <Tab.Navigator
      screenOptions={{
        headerStatusBarHeight: 80,
        tabBarStyle: {
          height: 80, 
          paddingBottom: 5, 
          backgroundColor: "#121212",
        },
        tabBarIconStyle: {
        marginVertical: 15,
        },
        tabBarActiveTintColor: "white", 
        tabBarInactiveTintColor: "#FF704390", 
        tabBarShowLabel: false, 
      }}
    >
      <Tab.Screen
        name="Current Listings"
        component={CurrentListings}
        
        options={{
          headerStyle: { backgroundColor: "#121212" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            height: 70,
            color: "#FF704390",
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="New Listing"
        component={CreateListing}
        options={{
          headerStyle: { backgroundColor: "#121212" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            height: 70,
            color: "#FF704390",
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" color={color} size={30}  />
          ),
        }}
      />
      
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: { backgroundColor: "#121212" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            height: 70,
            color: "#FF704390",
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: { backgroundColor: "#121212" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            height: 70,
            color: "#FF704390",
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default OwnerScreen;
