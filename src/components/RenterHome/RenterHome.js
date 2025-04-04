import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseListings from "./BrowseListing/BrowseListing"
import Settings from "./Settings/Settings"
import MyListings from "./MyListings/MyListings"
import Profile from "./Profile/profile"
import { MaterialIcons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();
const RenterHome = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerStatusBarHeight: 20,
      tabBarStyle: {
        height: 60, 
        paddingBottom: 5, 
        backgroundColor: "#121212",
        
      },
      tabBarIconStyle: {
      marginVertical: 10,
      },
      tabBarActiveTintColor: "white", 
      tabBarInactiveTintColor: "#66b2b2", 
      tabBarShowLabel: false, 
    }}
    >
      <Tab.Screen name="Browse Listings" 
      component={BrowseListings}
      options={{
                headerStyle: { 
                  backgroundColor: "#121212" },
                headerTitleAlign: "center",
                headerTitleStyle: {
                  height: 60,
                  color: "#66b2b2",
                  fontFamily: "Roboto",
                  fontSize: 22,
                  fontWeight: "bold",
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="search" color={color} size={30} />
        ),
      }}
      />
      <Tab.Screen name="My Listings" 
      component={MyListings} 
      options={{
        headerStyle: { backgroundColor: "#121212" },
        headerTitleAlign: "center",
        headerTitleStyle: {
          height: 60,
          color: "#66b2b2",
          fontFamily: "Roboto",
          fontSize: 22,
          fontWeight: "bold",
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="favorite" color={color} size={30} />
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
            height: 60,
            color: "#66b2b2",
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
          height: 60,
          color: "#66b2b2",
          fontFamily: "Roboto",
          fontSize: 22,
          fontWeight: "bold",
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" color={color} size={30} />
        ),
      }} />
      
    </Tab.Navigator>
  );
};

export default RenterHome;
