import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../database/firebase";
import styles from "./styles";
import baseStyles from "../../styles/baseStyle";

const Register = ({ navigation }) => {
  // Email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("renter"); // Default to 'renter'

  const handleRegister = async () => {
    // Validate fields

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!email || !password || !name || !role) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    console.log("Role during registration:", role);

    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add additional user data (name, role) to Firestore
      await setDoc(doc(database, "users", user.uid), {
        name: name,
        email: email,
        role: role,
      });

      // Navigate to home screen or login screen after registration
      if (role === "owner") {
        navigation.navigate("OwnerHome");
      } else {
        navigation.navigate("RenterHome");
      }

      Alert.alert("Success", "Registration successful!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
       <Text style={baseStyles.title}>Register</Text>
      <Text style={styles.subTitle}> ** Please fill out the following information, make sure you choose the correct role when registering for a better experience. **</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

<TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone"
        value={phone}
        autoCapitalize="none"
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
