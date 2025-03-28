import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import BrowseListings from "./BrowseListing/BrowseListing"
import Settings from "./Settings/Settings"
import MyListings from "./MyListings/MyListings"
import Profile from "./Profile/profile"

const Tab = createBottomTabNavigator();
const RenterHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 80, 
          paddingBottom: 5, 
          backgroundColor: "#121212",
        },
        tabBarIconStyle: {
        marginVertical: 15,
        },
        tabBarActiveTintColor: "white", 
        tabBarInactiveTintColor: "#66b2b2", 
        tabBarShowLabel: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Browse Listings") {
            iconName = "search";
          } else if (route.name === "My Listings") {
            iconName = "heart";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "Profile"){
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Browse Listings" 
          component={BrowseListings}
      options={{
                headerStyle: { backgroundColor: "#121212" },
                headerTitleAlign: "center",
                headerTitleStyle: {
                  height: 70,
                  color: "#66b2b2",
                  fontFamily: "Roboto",
                  fontSize: 22,
                  fontWeight: "bold",
                },
              }}
      />
      <Tab.Screen name="My Listings" 
      component={MyListings} 
      options={{
        headerStyle: { backgroundColor: "#121212" },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#66b2b2",
          fontFamily: "Roboto",
          fontSize: 22,
          fontWeight: "bold",
        },
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
            color: "#66b2b2",
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "bold",
          },
          
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
          color: "#66b2b2",
          fontFamily: "Roboto",
          fontSize: 22,
          fontWeight: "bold",
        },
      }} />
      
    </Tab.Navigator>
  );
};

export default RenterHome;
