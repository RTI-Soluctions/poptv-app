import React from "react";
import { View, Text, Image } from "react-native";
import { Navbar } from "../components/NavBar";
import { Divisor } from "../components/Divisor";
import { PlayerContainer } from "../components/PlayerContainer";
import { AboutUs } from "../components/AboutUs";
import { Contact } from "../components/Contact";
import { useAppContext } from "../context/AppContext";
import logoPop from "../../assets/logo-pop.png";

export const Home = () => {
  const { isHome, isAboutUs, isContact } = useAppContext();

  return (
    <View className="flex-1 bg-gray-800 flex-col items-center">
      <View className="flex-2 flex-row pt-12 pb-6 justify-center items-center gap-4">
        <Image className="w-24 h-10" source={logoPop} />
      </View>
      <Navbar />
      <Divisor />
      {isHome ? <PlayerContainer /> : <></>}
      {isAboutUs ? <AboutUs /> : <></>}
      {isContact ? <Contact /> : <></>}
      <View className="bg-gray-900 flex-7 justify-center items-center p-4 absolute bottom-0 w-full">
        <Text className="text-gray-200 font-thin text-sm bg-gray-900">
          ©copyrigth www.pop.tv.br 2024
        </Text>
      </View>
    </View>
  );
};
