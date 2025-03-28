import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";
import CreateListing from "./CreateListing/CreateListing";
import CurrentListings from "./CurrentListings/CurrentListings";
import Settings from "./Settings/Settings";

const Tab = createBottomTabNavigator();

const OwnerScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Current Listings"
        component={CurrentListings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create New Listing"
        component={CreateListing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default OwnerScreen;
