import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import baseStyles from "../../../styles/baseStyle";
import { useIconTheme } from '../../../hooks/useIconTheme';
import defaultIcon from "../../../../assets/icons/default.png";
import orangeTheme from "../../../../assets/icons/orangeTheme.png";
import blueTheme from "../../../../assets/icons/blueTheme.png";
import { Image } from "react-native";
import IconPicker from '../../IconPicker';


const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();
  const { iconTheme } = useIconTheme();

  const icons = {
      default: defaultIcon,
      orange: orangeTheme,
      blue: blueTheme,
     
    };
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
      // Disable notifications
      console.log("Notifications disabled");
      Notifications.removeNotificationSubscription(); // Assuming this will stop notifications

      Alert.alert("Notifications", "Notifications disabled!");
    } else {
      // Enable notifications
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        console.log("Notification permission granted");
        showNotification(); // Trigger notification
        Alert.alert("Notifications", "Notifications enabled!");
      } else {
        Alert.alert("Permissions", "Notification permissions denied.");
      }
    }
  };

  const showNotification = async () => {
    try {
      const result = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Thank you for enabling notifications",
          body: "You will now receive notifications for new listings.",
          sound: true,
          vibrate: true,
        },
        trigger: {
          seconds: 60, 
        },
      });
      console.log("Schedule Success:", result);
    } catch (error) {
      console.log("Schedule Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.settingItem, { flexDirection: 'column', alignItems: 'center' }]}>
              <Text style={[styles.label, { marginBottom: 10 }]}>Selected App Icon</Text>
              <Image
                source={icons[iconTheme]}
                style={{ width: 80, height: 80, marginBottom: 10 }}
              />
              <IconPicker />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications} // Toggle switch to enable/disable notifications
        />
      </View>
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
