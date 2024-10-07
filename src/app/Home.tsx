import Toast from "react-native-toast-message";
import logoPop from "../../assets/logo-pop.png";
import { Navbar } from "../components/NavBar";
import { Divisor } from "../components/Divisor";
import { AboutUs } from "../components/AboutUs";
import { useAppContext } from "../context/AppContext";
import React, { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as Burnt from "burnt";
import { Programation } from "../components/Programation";

export const Home = () => {
  const [key, setKey] = useState(0);
  const { isHome, isAboutUs, isPrograms } = useAppContext();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === "cellular") {
        Burnt.toast({
          duration: 1,
          haptic: "error",
          title: "Você está usando dados móveis!",
          from: "bottom",
        });

        setKey((prevKey) => prevKey + 1);
      } else if (state.type === "wifi") {
        Burnt.toast({
          duration: 1,
          haptic: "error",
          title: "Você está conectado a uma rede wifi!",
          from: "bottom",
        });
      }
    });

    NetInfo.fetch().then((state: NetInfoState) => {
      if (!state.isConnected) {
        Burnt.toast({
          duration: 1,
          haptic: "error",
          title: "Você está offline!",
          from: "bottom",
        });
      }
    });

    return () => unsubscribe();
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
      {isPrograms && <Programation />}
      {isAboutUs && <AboutUs />}
    </View>
  );
};
