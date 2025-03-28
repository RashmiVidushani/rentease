import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 26,
    color: "#008080",
    fontFamily: "Roboto",
    marginBottom: 30,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 20,
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
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#FF7043",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "Roboto",
    color: "#fff",

    fontSize: 18,
  },
  link: {
    marginTop: 15,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  roleText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
    marginTop: 5,
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#008080",
  },
  selectedRole: {
    fontWeight: "bold",
    color: "#FF7043",
  }
});

export default styles;
