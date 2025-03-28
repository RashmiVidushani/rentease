import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 25,
    backgroundColor: "#121212",
  },
  subTitle: {
    fontSize: 16,
    color: "red",
    paddingBottom: 50,
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
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#008080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
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
