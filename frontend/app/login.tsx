import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";
import { RelativePathString, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/environment";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      await AsyncStorage.setItem("token", res.data.token);
      router.replace("/dashboard" as RelativePathString);
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Username:</Text>
      <TextInput onChangeText={setUsername} />
      <Text>Password:</Text>
      <TextInput secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Forgot Password?" onPress={() => router.push("/forgot-password" as RelativePathString)} />
    </View>
  );
}
