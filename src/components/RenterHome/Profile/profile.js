import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../../database/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import styles from "./styles";

const Profile = () => {
  const auth = getAuth();
  const storage = getStorage();
  const user = auth.currentUser;
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    imageUrl: "",
  });
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userDoc = await getDoc(doc(database, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setUpdatedData(userDoc.data());
      }
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateDoc(doc(database, "users", user.uid), updatedData);
      setUserData(updatedData);
      setEditing(false);
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setUpdatedData(userData);
    setEditing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    setUploading(true);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const imageRef = ref(storage, `profile_pictures/${user.uid}/${uuid.v4()}.jpg`);
      const uploadTask = uploadBytesResumable(imageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading image:", error);
          Alert.alert("Error", "Failed to upload image.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUpdatedData((prev) => ({ ...prev, imageUrl: downloadURL }));
          await updateDoc(doc(database, "users", user.uid), { imageUrl: downloadURL });

          Alert.alert("Success", "Profile picture updated!");
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage} disabled={uploading} style={styles.imageContainer}>
        {uploading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : (
          <Image
            source={{ uri: updatedData.imageUrl || "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
        )}
      </TouchableOpacity>

      {/* Editable Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={updatedData.name}
        onChangeText={(text) => setUpdatedData({ ...updatedData, name: text })}
        editable={editing}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={updatedData.email}
        onChangeText={(text) => setUpdatedData({ ...updatedData, email: text })}
        editable={editing}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={updatedData.phone}
        onChangeText={(text) => setUpdatedData({ ...updatedData, phone: text })}
        editable={editing}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={updatedData.role}
        onChangeText={(text) => setUpdatedData({ ...updatedData, role: text })}
        editable={editing}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {editing ? (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;