import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.removeItem("token");
      router.replace("/login");
    };
    logout();
  }, []);

  return null;
}
