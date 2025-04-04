import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { collection, getDocs, setDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../../../database/firebase";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const BrowseRentersListings = () => {
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState({});
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    if (!user) {
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
            userId: userDoc.id,
            ...data,
            timeStamp: data.timeStamp ? data.timeStamp.toMillis() : Date.now(),
          });
        });
      }
  
      // Sort listings by timeStamp in descending order
      allListings.sort((a, b) => b.timeStamp - a.timeStamp);
  
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

  const toggleFavourite = async (listing) => {
    if (!user) return;

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

  const fetchOwnerDetails = async (ownerId) => {
    try {
      const ownerDoc = doc(database, "users", ownerId);
      const ownerSnapshot = await getDoc(ownerDoc);

      if (ownerSnapshot.exists()) {
        const ownerData = ownerSnapshot.data();
        setOwnerDetails(ownerData);
        setModalVisible(true); // Show the modal
      } else {
        setOwnerDetails(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error fetching owner details:", error);
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
            <Icon name={favourites[item.id] ? "heart" : "heart-outline"} size={30} color="red" />
          </TouchableOpacity>
          
        </View>
        <Text style={styles.subtitle}>
            Posted: {new Date(Number(item.timeStamp)).toLocaleDateString()}
        </Text>
        <Image
          source={{ uri: item.imageURL || "https://via.placeholder.com/150" }}
          style={styles.cardImage}
        />

        <View style={styles.cardDetails}>
          <Text style={styles.cost}>Cost: ${item.costOfRent}</Text>
          <Text style={styles.subtitle}>Summary:  {item.rentType} . {item.numberOfRooms} Rooms . {item.availability} </Text>
          
          {/* Owner Details Button */}
          <TouchableOpacity style={styles.ownerButton} onPress={() => fetchOwnerDetails(item.userId)}>
            <Text style={styles.buttonText}> Owner Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.emptyText}>No listings available.</Text>}
      />

      {/* Owner Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Owner Details</Text>
            {ownerDetails ? (
              <>
                <Text style={styles.modalText}>Name: {ownerDetails.name || "N/A"}</Text>
                <Text style={styles.modalText}>Email: {ownerDetails.email || "N/A"}</Text>
                <Text style={styles.modalText}>Phone: {ownerDetails.phone || "N/A"}</Text>
              </>
            ) : (
              <Text style={styles.modalText}>Owner details not found.</Text>
            )}
            <Pressable style={styles.ownerButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BrowseRentersListings;
