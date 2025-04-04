import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../../../database/firebase";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";



const MyListings = () => {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchFavourites = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to view favourites.");
      navigation.navigate("Login");
      return;
    }

    try {
      const favouritesRef = collection(database, `users/${user.uid}/favourites`);
      const snapshot = await getDocs(favouritesRef);
      let favListings = [];

      snapshot.docs.forEach((doc) => {
        favListings.push({
          id: doc.id,
          ...doc.data(),
        });
       

      });

      setFavourites(favListings);
    } catch (error) {
      console.error("Error fetching favourites: ", error);
      setFavourites([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavourites();
    }, [])
  );

  const removeFavourite = async (listingId) => {
    if (!user) return;

    try {
      const favouriteRef = doc(database, `users/${user.uid}/favourites/${listingId}`);
      await deleteDoc(favouriteRef);
      setFavourites((prev) => prev.filter((item) => item.id !== listingId));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Listing", { propertyInfo: item })}
      >
        <Image source={{ uri: item.imageURL || "https://via.placeholder.com/150" }} style={styles.cardImage} />
      </TouchableOpacity>

      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.addressLine1} {item.addressLine2}</Text>
        <Text style={styles.subtitle}>${item.costOfRent} - {item.rentType}</Text>

        <TouchableOpacity style={styles.heartButton} onPress={() => removeFavourite(item.id)}>
          <Icon name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favourites.length === 0 ? (
        <Text style={styles.emptyText}>No favourites yet.</Text>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};



export default MyListings;


