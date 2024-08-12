import { Navbar } from "../components/NavBar";
import Toast from "react-native-toast-message";
import { Divisor } from "../components/Divisor";
import logoPop from "../../assets/logo-pop.png";
import { AboutUs } from "../components/AboutUs";
import { Contact } from "../components/Contact";
import NetInfo from "@react-native-community/netinfo";
import { useAppContext } from "../context/AppContext";
import { MainContainer } from "../components/MainContainer";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AppState,
  StatusBar,
} from "react-native";

export const Home = () => {
  const [key, setKey] = useState(0);

  const { isHome, isAboutUs, isContact } = useAppContext();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === "cellular") {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Alerta de conexão",
          text2: "Você está usando dados móveis!",
        });

        setKey((prevKey) => prevKey + 1);
      } else if (state.type === "wifi") {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Alerta de conexão",
          text2: "Você está conectado a uma rede wifi!",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Alerta de conexão",
          text2: "Você está offline!",
        });
      }
    });
  }, []);

  return (
    <View className="flex-1 bg-gray-900 flex-col items-center">
      <View className="flex-2 flex-row pt-12 pb-2 justify-center items-center gap-4">
        <TouchableOpacity>
          <Image className="w-24 h-10" source={logoPop} />
        </TouchableOpacity>
        <Toast visibilityTime={4000} autoHide={true} position="top" />
      </View>
      <Navbar />
      <Divisor />
      {isHome && (
        <ScrollView className="flex-1 w-full ml-4">
          <MainContainer key={key} />
        </ScrollView>
      )}
      {isAboutUs && <AboutUs />}
      {isContact && <Contact />}
    </View>
  );
};
