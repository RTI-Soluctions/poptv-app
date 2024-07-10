import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Divisor } from "../components/Divisor";
import { PlayerContainer } from "../components/PlayerContainer";
import logoPop from "../../assets/logo-pop.png";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export const Home = () => {
  const [key, setKey] = useState(0);

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

  return (
    <View className="flex-1 bg-gray-800 flex-col items-center">
      <View className="flex-2 flex-row pt-16 pb-2 justify-center items-center gap-4">
        <TouchableOpacity>
          <Image className="w-24 h-10" source={logoPop} />
        </TouchableOpacity>
      </View>
      <Toast visibilityTime={4000} autoHide={true} position="top" />
      <Divisor />
      <PlayerContainer key={key} />
      <View className="bg-gray-900 flex-7 justify-center items-center p-4 absolute bottom-0 w-full">
        <Text className="text-white font-thin text-sm bg-gray-900">
          © 2024 Pop TV. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
};
