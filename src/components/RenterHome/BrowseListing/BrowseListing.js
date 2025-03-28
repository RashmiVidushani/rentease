import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../../../database/firebase";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const BrowseRentersListings = () => {
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState({});
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to view listings.");
      navigation.navigate("Login");
      return;
    }

    try {
      const usersCollectionRef = collection(database, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      let allListings = [];

      // Fetch favourites
      const favouritesRef = collection(database, `users/${user.uid}/favourites`);
      const favouritesSnapshot = await getDocs(favouritesRef);
      let favs = {};
      favouritesSnapshot.forEach((doc) => {
        favs[doc.id] = true;
      });
      setFavourites(favs);

      // Loop through all users and get their listings
      for (const userDoc of usersSnapshot.docs) {
        const listingsCollectionRef = collection(userDoc.ref, "listings");
        const listingsSnapshot = await getDocs(listingsCollectionRef);

        listingsSnapshot.forEach((listingDoc) => {
          const data = listingDoc.data();
          allListings.push({
            id: listingDoc.id,
            ...data,
            timeStamp: data.timeStamp ? data.timeStamp.toMillis() : Date.now(),
          });
        });
      }

      setListings(allListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchListings();
    }, [])
  );

  // Toggle favorite status
  const toggleFavourite = async (listing) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to favourite listings.");
      return;
    }

    const favouriteRef = doc(database, `users/${user.uid}/favourites/${listing.id}`);

    try {
      if (favourites[listing.id]) {
        await deleteDoc(favouriteRef);
        setFavourites((prev) => {
          const updated = { ...prev };
          delete updated[listing.id];
          return updated;
        });
      } else {
        await setDoc(favouriteRef, listing);
        setFavourites((prev) => ({ ...prev, [listing.id]: true }));
      }
    } catch (error) {
      console.error("Error updating favourite:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Listing", { propertyInfo: item })}>
      <View style={styles.card}>
      <View style={styles.Header}>
        <Text style={styles.cardTitle}>
          {item.addressLine1} {item.addressLine2}
        </Text>
        <TouchableOpacity
            style={styles.favouriteButton}
            onPress={() => toggleFavourite(item)}
          >
            <Text style={styles.favouriteButtonText}>
              {favourites[item.id] ? 
              <Icon name="heart" size={30} color="red" />
               : <Icon name="heart" size={26} color="gray" />}
            </Text>
          </TouchableOpacity>
        
      </View>
      
      

        <Image
          source={{ uri: item.imageURL || "https://via.placeholder.com/150" }}
          style={styles.cardImage}
        />
        <View style={styles.cardDetails}>

          <Text style={styles.cost}>Cost: ${item.costOfRent}</Text>
          <Text style={styles.subtitle}>Rent Type: {item.rentType}</Text>
          <Text style={styles.subtitle}>Rooms: {item.numberOfRooms}</Text>
          <Text style={styles.subtitle}>
            Date Posted: {new Date(item.timeStamp).toLocaleDateString()}
          </Text>
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

export default BrowseRentersListings;
