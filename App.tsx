import React from "react";
import { StatusBar } from "expo-status-bar";
import { Home } from "./src/app/Home";
import { MyContextProvider } from "./src/context/AppContext";
import { useKeepAwake } from "expo-keep-awake";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [fontsLoaded, fontError] = useFonts(Ionicons.font);
  useKeepAwake(); // mantém a tela ligada enquanto o app estiver em primeiro plano

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <StatusBar style="light" />
        {fontError ? (
          <Text style={styles.error}>Não foi possível carregar os ícones. Reinicie o aplicativo.</Text>
        ) : (
          <ActivityIndicator size="large" color="#1bafff" />
        )}
      </View>
    );
  }

  return (
    <MyContextProvider>
      <Home />
      <StatusBar style="light" />
    </MyContextProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  error: {
    color: "#ffffff",
    textAlign: "center",
  },
});
