import Toast from "react-native-toast-message";
import logoPop from "../../assets/logo-pop.png";
import { Navbar } from "../components/NavBar";
import { Divisor } from "../components/Divisor";
import { AboutUs } from "../components/AboutUs";
import { Contact } from "../components/Contact";
import { useAppContext } from "../context/AppContext";
import React, { useState } from "react";
import { MainContainer } from "../components/MainContainer";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";

export const Home = () => {
  const [key, setKey] = useState(0);

  const { isHome, isAboutUs, isContact } = useAppContext();

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
