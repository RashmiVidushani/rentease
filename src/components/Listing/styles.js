import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  address: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cost: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  rentType: {
    fontSize: 14,
    marginTop: 5,
  },
  numberOfRooms: {
    fontSize: 14,
    marginTop: 5,
  },
  availability: {
    fontSize: 14,
    marginTop: 5,
  },
  datePosted: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    justifyContent: "center",
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default styles;