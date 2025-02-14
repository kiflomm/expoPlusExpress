import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { router, type RelativePathString } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) router.replace("/login" as RelativePathString);
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user}!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/reset-password" as RelativePathString)}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]}
          onPress={() => router.replace("/logout")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
