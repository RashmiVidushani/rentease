import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // To allow image picking
import * as Location from "expo-location"; // To get current location
import styles from "../styles";
import baseStyles from "../../../styles/baseStyle";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database } from "../../../database/firebase";
import { ScrollView } from "react-native-gesture-handler";

const GOOGLE_API_KEY = "AIzaSyBO2vLUoT3Z_vnmvgZxh3-HWudHiwJUp8I";

const CreateListing = () => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [location, setLocation] = useState(null);
  const [costOfRent, setCostOfRent] = useState("");
  const [rentType, setRentType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [availability, setAvailability] = useState("");
  const [imageUri, setImageUri] = useState(""); // For storing image URI
  const storage = getStorage();

  // Function to pick an image
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to get the user's current location
  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    fetchAddressFromLocation(location.coords);
  };

  // Function to fetch address from Google Maps API
  const fetchAddressFromLocation = async (coords) => {
    const { latitude, longitude } = coords;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const result = response.data.results[0];
        const addressComponents = result.address_components;

        setAddressLine1(addressComponents[0]?.long_name || "");
        setAddressLine2(addressComponents[1]?.long_name || "");
        setPostalCode(
          addressComponents.find((comp) => comp.types.includes("postal_code"))
            ?.long_name || ""
        );
      } else {
        alert("Unable to retrieve address");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Error fetching address. Please try again.");
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImageToFirebase = async (userId, listingId, localUri) => {
    try {
      const response = await fetch(localUri);
      const blob = await response.blob();

      const fileName = localUri.split("/").pop();
      const storagePath = `listings/${userId}/${listingId}/${fileName}`;
      const storageRef = ref(storage, storagePath);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Function to upload listing data to Firestore
  const uploadListing = async (listingData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is logged in. Please sign in first.");
      }

      const userId = user.uid;
      const listingId = Date.now().toString();

      // Upload image and get its URL
      const imageURL = await uploadImageToFirebase(userId, listingId, imageUri);

      const listingRef = doc(database, `users/${userId}/listings`, listingId);
      await setDoc(listingRef, { ...listingData, imageURL });

      Alert.alert("Success", "Listing uploaded successfully!");
      resetFields();
    } catch (error) {
      console.error("Error uploading listing:", error);
      Alert.alert("Error", "Failed to upload listing.");
    }
  };

  // Function to reset form fields
  const resetFields = () => {
    setAddressLine1("");
    setAddressLine2("");
    setPostalCode("");
    setLocation(null);
    setCostOfRent("");
    setRentType("");
    setNumberOfRooms("");
    setAvailability("");
    setImageUri("");
  };

  // Validate and submit listing
  const handleSubmit = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User is not logged in.");
      return;
    }

    if (
      !imageUri ||
      !addressLine1 ||
      !addressLine2 ||
      !postalCode ||
      !costOfRent ||
      !rentType ||
      !numberOfRooms ||
      !availability
    ) {
      Alert.alert("Error", "All fields must be filled in to submit.");
      return;
    }

    const listingData = {
      imageUri,
      addressLine1,
      addressLine2,
      postalCode,
      costOfRent,
      rentType,
      numberOfRooms,
      availability,
      userId: user.uid,
    };

    uploadListing(listingData);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Image upload */}
      <View style={styles.imageUploadContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Image src={imageUri} />
            <Text style={styles.imageUploadText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Get current location button */}
      <TouchableOpacity style={baseStyles.locationBtn}
        onPress={getCurrentLocation}
      >
        <Text style={baseStyles.locationButtonText}>Get Current Location</Text>
      </TouchableOpacity>

      {/* Form Inputs */}
      <TextInput style={styles.input} placeholder="Address Line 1" value={addressLine1} onChangeText={setAddressLine1} />
      <TextInput style={styles.input} placeholder="Address Line 2" value={addressLine2} onChangeText={setAddressLine2} />
      <TextInput style={styles.input} placeholder="Postal Code" value={postalCode} onChangeText={setPostalCode} />
      <TextInput style={styles.input} placeholder="Cost of Rent" keyboardType="numeric" value={costOfRent} onChangeText={setCostOfRent} />
      <TextInput style={styles.input} placeholder="Rent Type (Shared/Private)" value={rentType} onChangeText={setRentType} />
      <TextInput style={styles.input} placeholder="Number of Rooms" keyboardType="numeric" value={numberOfRooms} onChangeText={setNumberOfRooms} />
      <TextInput style={styles.input} placeholder="Availability" value={availability} onChangeText={setAvailability} />

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={baseStyles.buttonText}>Submit Listing</Text>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
  );
};

export default CreateListing;
