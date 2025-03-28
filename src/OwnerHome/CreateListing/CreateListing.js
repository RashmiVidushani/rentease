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
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../../database/firebase";
import { getAuth } from "firebase/auth";

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

  // Function to pick image
  const pickImage = async () => {
    // Request permissions for image picker
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker and get the selected image
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {
      if (!result.canceled) {
        console.log("Image URI", result.assets[0].uri);
        setImageUri(String(result.assets[0].uri)); // Save the selected image URI
      }
    });
  };

  // Function to get the users current location
  const getCurrentLocation = async () => {
    // Get location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    // Get the current location
    const location = await Location.getCurrentPositionAsync({});
    console.log(location.coords);
    setLocation(location.coords);
    fetchAddressFromLocation(location.coords);
  };

  const fetchAddressFromLocation = async (coords) => {
    const { latitude, longitude } = coords;

    // Make a request to the Google Maps Geocoding API
    console.log("Making request to Google Maps");
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    );

    console.log(
      "Continuing " + response.data.results[0].address_components[1].long_name
    );

    if (response.data.status === "OK") {
      const result = response.data.results[0];
      const addressComponents = result.address_components;

      // Extract the relevant address fields
      setAddressLine1(addressComponents[0]?.long_name || ""); // Street address
      setAddressLine2(addressComponents[1]?.long_name || ""); // Address line 2
      setPostalCode(
        addressComponents.find((component) =>
          component.types.includes("postal_code")
        )?.long_name || ""
      );
    } else {
      alert("Unable to retrieve address");
    }
  };

  const uploadListing = async (listingData) => {
    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser; // Get the currently signed-in user
      const userId = user.uid

      if (!user) {
        throw new Error("No user is logged in. Please sign in first.");
      }

      const listingRef = doc(
        database,
        `users/${userId}/listings`,
        `${Date.now()}`
      ); // Unique ID for the listing
      await setDoc(listingRef, listingData);
      Alert.alert("Success", "Listing uploaded successfully!");
      resetFields();
    } catch (error) {
      console.error("Error uploading listing: ", error);
      Alert.alert("Error", "Failed to upload listing.");
    }
  };

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

  // Validate all fields before submitting
  const handleSubmit = () => {
    const auth = getAuth(); // Initialize Firebase Auth
    const userId = auth.currentUser.uid;

    console.log(imageUri);
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

    // Proceed to Firestore submission (for now just log the data)
    console.log({
      addressLine1,
      addressLine2,
      postalCode,
      costOfRent,
      rentType,
      numberOfRooms,
      availability,
    });

    const listingData = {
      imageUri,
      addressLine1,
      addressLine2,
      postalCode,
      costOfRent,
      rentType,
      numberOfRooms,
      availability,
      userId
    };

    console.log("Uploading listing: ", listingData);
    uploadListing(listingData);
  };

  return (
    <View style={styles.container}>
      {/* Image upload */}
      <View style={styles.imageUploadContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.imageUploadText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Get current location button */}
      <TouchableOpacity
        onPress={getCurrentLocation}
        style={styles.locationButton}
      >
        <Text style={styles.buttonText}>Get Current Location</Text>
      </TouchableOpacity>

      {/* Address line 1 */}
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />

      {/* Address line 2 */}
      <TextInput
        style={styles.input}
        placeholder="Address Line 2"
        value={addressLine2}
        onChangeText={setAddressLine2}
      />

      {/* Postal Code */}
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />

      {/* Rent Cost */}
      <TextInput
        style={styles.input}
        placeholder="Cost of Rent"
        keyboardType="numeric"
        value={costOfRent}
        onChangeText={setCostOfRent}
      />

      {/* Rent Type */}
      <TextInput
        style={styles.input}
        placeholder="Rent Type (Shared/Private)"
        value={rentType}
        onChangeText={setRentType}
      />

      {/* Number of Rooms */}
      <TextInput
        style={styles.input}
        placeholder="Number of Rooms"
        keyboardType="numeric"
        value={numberOfRooms}
        onChangeText={setNumberOfRooms}
      />

      {/* Availability */}
      <TextInput
        style={styles.input}
        placeholder="Availability (Available/Next Month/ Fortnight)"
        value={availability}
        onChangeText={setAvailability}
      />

      {/* Submit button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit Listing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateListing;
