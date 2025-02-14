import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";
import { router, type RelativePathString } from "expo-router";
import { API_URL } from "@/constants/environment";

export default function Register() {
  const [form, setForm] = useState({ firstname: "", lastname: "", username: "", password: "" });

  const handleRegister = async () => {
    try {
      // check if the fields are empty
      if (form.firstname === "" || form.lastname === "" || form.username === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      
      await axios.post(`${API_URL}/api/auth/register`, form);
      Alert.alert("Success", "Account Created!");
      router.push("/login" as RelativePathString);
    } catch (error) {
      Alert.alert("Error", "Username already exists");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, firstname: text })}
          placeholder="Enter your first name"
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, lastname: text })}
          placeholder="Enter your last name"
        />
        <Text style={styles.label}>Username:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, username: text })}
          placeholder="Choose a username"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput 
          style={styles.input}
          secureTextEntry 
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder="Choose a password"
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
