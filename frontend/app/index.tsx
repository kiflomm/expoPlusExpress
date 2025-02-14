import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { router, type RelativePathString } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      // if (!token) router.replace("/");
    };
    checkLogin();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user}!</Text>
      <Button title="Reset Password" onPress={() => router.push("/reset-password" as RelativePathString)} />
      <Button title="Logout" onPress={() => router.replace("/logout")} />
    </View>
  );
}
