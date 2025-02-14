import { View, Text, TextInput, Button, Alert } from "react-native";
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
    <View style={{ padding: 20 }}>
      <Text>First Name:</Text>
      <TextInput onChangeText={(text) => setForm({ ...form, firstname: text })} />
      <Text>Last Name:</Text>
      <TextInput onChangeText={(text) => setForm({ ...form, lastname: text })} />
      <Text>Username:</Text>
      <TextInput onChangeText={(text) => setForm({ ...form, username: text })} />
      <Text>Password:</Text>
      <TextInput secureTextEntry onChangeText={(text) => setForm({ ...form, password: text })} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
