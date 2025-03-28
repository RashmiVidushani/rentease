import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StatusBar } from "react-native";
import styles from "./styles";
import { auth, database } from "../../database/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import baseStyles from "../../styles/baseStyle";


const Login = ({ title, buttonLabel, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter"); // Default role

  // Email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async () => {
    // Validate email
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
         
        // get user id from credential
        const user = result.user;
        const uid = user.uid;

        getDocs(collection(database, "users")).then((result) => {
          result.forEach((doc) => {
            
            if (doc.id === uid) {
              const userData = doc.data();
              const userRole = userData?.role || "renter";
              Alert.alert("Login Successful", `Welcome back, ${userRole}!`);
              if (userRole === "owner") {
                navigation.navigate("OwnerHome"); 
              } else {
                navigation.navigate("RenterHome");
              }
            }
          });
        });
      })
      .catch((err) => {
        Alert.alert("Login Failed", "Please check your email and password and try again" + err);
      });
  };

  return (
    <View style={baseStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />

      <Image source={require('../../../assets/logo.png') }
          style={styles.image}/>

      <Text style={baseStyles.title}>Sign In</Text>

      <TextInput
        style={baseStyles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={baseStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={baseStyles.button} onPress={handleLogin}>
        <Text style={baseStyles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
