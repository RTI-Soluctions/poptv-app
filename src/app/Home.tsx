import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Divisor } from "../components/Divisor";
import { PlayerContainer } from "../components/PlayerContainer";
import logoPop from "../../assets/logo-pop.png";

export const Home = () => {

  return (
    <View className="flex-1 bg-gray-800 flex-col items-center">
      <View className="flex-2 flex-row pt-16 pb-2 justify-center items-center gap-4">
        <TouchableOpacity >
          <Image className="w-24 h-10" source={logoPop} />
        </TouchableOpacity>
      </View>
      <Divisor />
      <PlayerContainer />
      <View className="bg-gray-900 flex-7 justify-center items-center p-4 absolute bottom-0 w-full">
        <Text className="text-gray-200 font-thin text-sm bg-gray-900">
          ©copyrigth www.pop.tv.br 2024
        </Text>
      </View>
    </View>
  );
};
