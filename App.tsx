import React from "react";
import { StatusBar } from "expo-status-bar";
import { Home } from "./src/app/Home";
import { MyContextProvider } from "./src/context/AppContext";
import { useKeepAwake } from "expo-keep-awake";

export default function App() {
  useKeepAwake(); // mantém a tela ligada enquanto o app estiver em primeiro plano

  return (
    <MyContextProvider>
      <Home />
      <StatusBar style="light" />
    </MyContextProvider>
  );
}
