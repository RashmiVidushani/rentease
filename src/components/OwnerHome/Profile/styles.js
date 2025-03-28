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
      borderColor: "#FF704390",
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 10,
      borderRadius: 20,
      backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: "center",
    height: 45,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderColor: "#FF7043",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  cancelbuttonText: { 
    color: "#FF7043",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonText: {
    fontFamily: "Roboto",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
    });
export default styles;