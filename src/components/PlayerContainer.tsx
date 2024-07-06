import React from "react";
import { Text, View } from "react-native";
import { VideoPlayer } from "./Player";
import { Divisor } from "./Divisor";
import { CarouselComponent } from "./Carousel";

export const PlayerContainer = () => {
  return (
    <View className="flex-col justify-around mt-8 bg-gray-800">
      <Text className="text-center text-2xl font-bold text-white ">
        Ao Vivo
      </Text>
      <View className="items-center mt-2 mb-8 ">
        <VideoPlayer />
      </View>
      <Divisor />
      <View className="justify-center items-center mt-2 mb-8 ">
        <CarouselComponent />
      </View>
      <Divisor />
      <View className="justify-center items-center mt-12 mb-8 ">
        <Text className="text-center text-2xl font-bold text-white ">
          Em breve, novidades!
        </Text>
      </View>
    </View>
  );
};
