import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  imageUploadContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#FF704330",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageUploadText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF7043",
  },
  imageUriText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderBottomRadius: 20,
  },
  submitButton:{
      marginTop: 10,
      width: "100%",
      height: 40,
      backgroundColor: "#FF7043",
      paddingVertical: 8,
      borderRadius: 5,
      alignItems: "center",
      marginBottom:15,
  }
  
});

export default styles;


//test 
//gs://rentease-3380b.firebasestorage.app/listings/Oh9BaiGmcgNCE0DzwLZD2lUNqdB3/1742536785384/1.jpg
//Oh9BaiGmcgNCE0DzwLZD2lUNqdB3
//1742536785384