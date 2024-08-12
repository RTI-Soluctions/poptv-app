import React from "react";
import { StatusBar } from "expo-status-bar";
import { Home } from "./src/app/Home";
import { MyContextProvider } from "./src/context/AppContext";

export default function App() {
  return (
    <MyContextProvider>
      <Home />
      <StatusBar style="light" />
    </MyContextProvider>
  );
}
