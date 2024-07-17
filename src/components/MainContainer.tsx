import React from "react";
import { Text, View } from "react-native";
import { Divisor } from "./Divisor";
import { CarouselComponent } from "./Carousel";
import VideoPlayer from "./VideoPlayer";

export const MainContainer = () => {
  return (
    <View className="flex-col justify-around mt-4 bg-gray-900">
      <Text className="text-center text-xl font-bold text-white ">Ao Vivo</Text>
      <VideoPlayer />
      <Divisor />
      <CarouselComponent />
      <Divisor />
      <Text className="text-center text-2xl font-bold text-white py-4">
        Em breve, novidades!
      </Text>
    </View>
  );
};
