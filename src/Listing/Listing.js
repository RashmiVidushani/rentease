import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { getAuth } from "firebase/auth";
import { useRoute } from "@react-navigation/native";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const route = useRoute(); // Get route params

  useEffect(() => {
    fetchListings();
  }, [route.params.propertyInfo]);

  const fetchListings = async () => {
    console.log(route.params.propertyInfo);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "You must be logged in to view listings.");
      navigation.navigate("Login");
      return;
    }
    console.log("Listing" + route.params.propertyInfo);
    setListing(route.params.propertyInfo);
  };

  if (!listing) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Loading.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: listing.imageUri }} style={styles.image} />
      <Text style={styles.address}>
        {listing.addressLine1}, {listing.addressLine2}
      </Text>
      <Text style={styles.cost}>Cost: ${listing.costOfRent}</Text>
      <Text style={styles.rentType}>Accomodation Type: {listing.rentType}</Text>
      <Text style={styles.numberOfRooms}>
        Number of Rooms: {listing.numberOfRooms} Rooms
      </Text>
      <Text style={styles.availability}>
        Availability: {listing.availability}
      </Text>
      <Text style={styles.datePosted}>
        Listed on {new Date(Number(listing.timeStamp)).toLocaleString()}
      </Text>
    </View>
  );
};

export default Listing;
