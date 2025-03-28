import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 3, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: 120,
    height: "100%",
    borderRadius: 8,
    marginRight: 8,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#555",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B", // A visually striking red
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: "100%",
    alignSelf: "flex-start", // Adjust button position
    marginTop: 8,
  },
  deleteButtonText: {
    color: "#FFF", // White text for contrast
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
