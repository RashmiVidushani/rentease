import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import BrowseListings from "./BrowseListing/BrowseListing"
import Settings from "./Settings/Settings"

const Tab = createBottomTabNavigator();
const RenterHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Browse Listings") {
            iconName = "search";
          } else if (route.name === "My Listings") {
            iconName = "heart";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Browse Listings" component={BrowseListings} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default RenterHome;
