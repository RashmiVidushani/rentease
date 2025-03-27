import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import styles from "./styles";
import { auth, database } from "../../database/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

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
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Image source={require('../../../assets/logo.png') }
          style={styles.image}/>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => setRole("renter")}>
          <Text
            style={[styles.roleText, role === "renter" && styles.selectedRole]}
          >
            Renter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole("owner")}>
          <Text
            style={[styles.roleText, role === "owner" && styles.selectedRole]}
          >
            Owner
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
