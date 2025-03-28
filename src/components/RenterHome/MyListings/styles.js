import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#cce5e5",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#66b2b2",
    borderRadius: 10,
    elevation: 3,
  },
  cardImage: {
    alignSelf: "center",
    marginTop: 10,
    width: "90%",
    height: 180,
  },
  cardDetails: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  heartButton: {
    padding: 6,
  },
});

export default styles;