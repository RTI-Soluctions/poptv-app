import React from "react";
import { Text, View } from "react-native";
import { Divisor } from "./Divisor";
import VideoPlayer from "./VideoPlayer";

export const MainContainer = () => {
  return (
    <View className="flex-col justify-around mt-4 bg-gray-900">
      <Text className="text-center text-xl font-bold text-white ">Ao Vivo</Text>
      <VideoPlayer />
      <Divisor />
    </View>
  );
};
