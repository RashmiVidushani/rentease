import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
  },
  imageContainer: {
    marginBottom: 20,
    overflow: "hidden",
  },
  profileImage: {
    marginTop: 20,
    marginBottom: 15,
    width: 350,
    height: 250,
  },
  input: {
    width: "100%",
    height: 45,
    fontSize: 18,
    borderColor: "#008080",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: "#fffff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#008080",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: "#008080",
    paddingVertical: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 5,
    borderColor: "#008080",
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
  },
  cancelbuttonText: {
    color: "#008080",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
    });
export default styles;