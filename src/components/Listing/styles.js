import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 15,
  },
  listingDetails: {
    paddingHorizontal: 15,
    margin:20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 1,
  },
  address: {
    marginTop: 10,
    fontSize: 22,
    marginLeft: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cost: {
    fontSize: 18,
    color: "green",
    marginTop: 5,
    marginEnd: 30,
    textAlign:"right",
  },
  rentType: {
    color: "#e74c3c",
    fontSize: 18,
    marginTop: 10,
  },
  numberOfRooms: {
    fontSize: 18,
    marginTop: 10,
  },
  postalCode: {
    fontSize: 18,
    marginTop: 10,
  },
  availability: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  datePosted: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    fontStyle: "italic",
    color: "gray",
  },
  noDataContainer: {
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