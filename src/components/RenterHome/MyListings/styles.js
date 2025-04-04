import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: 'center',  
    
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center', 
    fontSize: 18,
    color: "#777",
  },
  card: {
    backgroundColor: "#fff",
    borderBottomRightRadius:20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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