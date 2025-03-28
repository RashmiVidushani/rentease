import React, { useState, useEffect } from "react";
import { View, Text, Button, Switch, TouchableOpacity, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../../database/firebase";
import * as Notifications from "expo-notifications";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import baseStyles from "../../../styles/baseStyle";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
        Alert.alert("Signed Out", "You have been signed out successfully.");
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
        Alert.alert("Error", "Failed to sign out.");
      });
  };

  const toggleNotifications = async () => {
    setNotificationsEnabled((prev) => !prev);
    
    if (notificationsEnabled) {
      console.log("Notifications disabled")  
      Notifications.removeNotificationSubscription();

      Alert.alert("Notifications", "Notifications disabled!");
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        
        showNotification()
      } else {
        Alert.alert("Permissions", "Notification permissions denied.");
      }
    }
  };

  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Thank you for enabling notifications",
        body: "You will now receive notifications for new listings.",
        sound: true,
        vibrate: true,
      },
      trigger: {
        seconds: 60,
      }
    })
      .then((result) =>  {
        console.log("Schedule Success:", result);
       
      })
      .catch((error) => {
        console.log("Schedule Error:", error);
      });
  };

  const deleteAllListings = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all your listings?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteListings();
          },
        },
      ]
    );
  };

  const deleteListings = async () => {
    try {
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "You need to be logged in to delete listings.");
        return;
      }

      const listingsRef = collection(database, `users/${userId}/listings`);
      const querySnapshot = await getDocs(listingsRef);

      const batchPromises = [];
      querySnapshot.forEach((document) => {
        const data = document.data();

        const docRef = doc(database, `users/${userId}/listings`, document.id);
        batchPromises.push(deleteDoc(docRef));
      });

      await Promise.all(batchPromises);
      Alert.alert("Success", "All listings have been deleted.");
    } catch (error) {
      console.error("Error deleting listings: ", error);
      Alert.alert("Error", "Failed to delete listings. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
     
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAllListings}>
          <Text style={styles.deleteButtonText}>Delete All Listings</Text>
      </TouchableOpacity>
    <View style={{ flex: 1 }} />
     <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={(handleSignOut)}>
          <Text style={baseStyles.signoutText} >Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
