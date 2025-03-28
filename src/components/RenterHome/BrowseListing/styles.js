import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  Header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderBottomRightRadius:20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardImage: {
    width: "100%",
    marginTop: 10,
    height: 200,
    marginBottom: 10,
  },
  cardDetails: {
    paddingHorizontal: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  subtitle:{
    fontSize: 14,
    color: "gray",
    marginBottom: 3,
  },
  cost:{
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
  },
});

export default styles;