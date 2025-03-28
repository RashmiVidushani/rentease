import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../../../database/firebase";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const CurrentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    console.log("Fetching listings...");
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        Alert.alert("Error", "You must be logged in to view listings.");
        navigation.navigate("Login");
        return;
      }
  
      const userId = user.uid;
      const listingsRef = collection(database, `users/${userId}/listings`);
      const snapshot = await getDocs(listingsRef);
      let fetchedListing = [];
  
      snapshot.docs.forEach((doc) => {
        fetchedListing.push({
          id: doc.id,
          ...doc.data(),
          timeStamp: doc.id, // Ensure timestamp is stored
        });
      });
  
      setListings(fetchedListing);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching listings: ", error);
      Alert.alert("Error", "Unable to fetch listings.");
    }
  };
  

  const deleteListing = async (listingId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "You must be logged in to delete listings.");
        navigation.navigate("Login");
        return;
      }

      const userId = user.uid;
      await deleteDoc(doc(database, `users/${userId}/listings/${listingId}`));
      Alert.alert("Success", "Listing deleted successfully.");
      fetchListings(); // Refresh listings
    } catch (error) {
      console.error("Error deleting listing: ", error);
      Alert.alert("Error", "Unable to delete listing.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchListings(); // Fetch listings when the tab is focused
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Listing", { propertyInfo: item })}
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {item.addressLine1 + " " + item.addressLine2}
        </Text>
        <Image
          source={{ uri: item.imageURL || "https://via.placeholder.com/150" }} // Use imageURL from Firestore
          style={styles.cardImage}
        />
        <View style={styles.details}>
          <Text style={styles.cost}>Cost: ${item.costOfRent}</Text>
          <Text style={styles.subtitle}>Type: {item.rentType}</Text>
          <Text style={styles.subtitle}>Rooms: {item.numberOfRooms}</Text>
          <Text style={styles.subtitle}>
            Posted: {new Date(Number(item.timeStamp)).toLocaleDateString()}
          </Text>
          <Text style={styles.subtitle}>Availability: {item.availability}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteListing(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (listings.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No listings available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default CurrentListings;
