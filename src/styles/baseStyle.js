import { StyleSheet } from "react-native";
const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
      backgroundColor: "#121212",
    },
    title: {
      fontSize: 26,
      color: "#E8795C",
      fontFamily: "Roboto",
      marginBottom: 30,
      fontWeight: "bold",
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
        marginTop: 10,
        width: "100%",
        height: 45,
        backgroundColor: "#008080",
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "center",
        marginBottom:15,
      },
      locationBtn: {
        borderColor: "#FF704390",
        borderWidth: 1,
        marginTop: 10,
        backgroundColor: "#fff",
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "center",
        marginBottom:15,
      },
      locationButtonText: {
        fontFamily: "Roboto",
        color: "#FF7043",
        fontSize: 16,
      },
      buttonText: {
        fontFamily: "Roboto",
        color: "#fff",
        fontSize: 18,
      },
      signoutText: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "red",
        fontSize: 18,
      }
      ,
      signOutButton: {
        width: "60%",
        height: 45,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginBottom: 15,
        backgroundColor: "red",
        fontSize: 18,
      }

});

export default baseStyles;