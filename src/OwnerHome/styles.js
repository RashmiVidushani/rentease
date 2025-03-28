import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageUploadContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#dcdcdc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageUploadText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#555",
  },
  imageUriText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  locationButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default styles;
