import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { router, type RelativePathString } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Dashboard() {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: ''
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login" as RelativePathString);
      } else {
        // Get user data from AsyncStorage
        const userDataStr = await AsyncStorage.getItem("user");
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          setUserData(userData);
        }
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.nameText}>
            {userData.firstname} {userData.lastname}
          </Text>
          <Text style={styles.usernameText}>@{userData.username}</Text>
        </View>
      </View>

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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
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
