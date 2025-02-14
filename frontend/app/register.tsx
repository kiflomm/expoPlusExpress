import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";
import { router } from "expo-router";

export default function Register() {
  const [form, setForm] = useState({ firstname: "", lastname: "", username: "", password: "" });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      Alert.alert("Success", "Account Created!");
      router.push("/login");
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
