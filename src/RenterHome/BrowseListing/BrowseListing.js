import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../../../database/firebase";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const BrowseListing = () => {
  const [listings, setListings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "You must be logged in to view listings.");
        navigation.navigate("Login");
        return;
      }
      // Reference to the `users` collection
      const usersCollectionRef = collection(database, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);

      let allListings = [];

      // Loop through all user documents
      for (const userDoc of usersSnapshot.docs) {
        const listingsCollectionRef = collection(userDoc.ref, "listings");
        const listingsSnapshot = await getDocs(listingsCollectionRef);

        // Add listings to the array
        listingsSnapshot.forEach((listingDoc) => {
          console.log(`Adding ${listingDoc.id}`);
          allListings.push({
            id: listingDoc.id,
            ...listingDoc.data(),
            timeStamp: listingDoc.id
          });
        });
      }

      console.log("All listings " + allListings[0].id)
      setListings(allListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchListings(); // Fetch listings when the tab is focused
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Listing", { propertyInfo: item })
      } // Navigate to PropertyDetails
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.imageUri || "https://via.placeholder.com/150" }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>
            {item.addressLine1} {item.addressLine2}{" "}
          </Text>
          <Text style={styles.subtitle}>Cost: ${item.costOfRent}</Text>
          <Text style={styles.subtitle}>Type: {item.rentType}</Text>
          <Text style={styles.subtitle}>Rooms: {item.numberOfRooms}</Text>
          <Text style={styles.subtitle}>Availability: {item.availability}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={listings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No listings available.</Text>
      }
    />
  );
};

export default BrowseListing;
