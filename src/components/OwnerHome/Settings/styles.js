import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  bottomButtons: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
});
