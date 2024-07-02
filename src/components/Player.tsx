import React from "react";
import { View, useWindowDimensions } from "react-native";
import NewPlayer from "./NewVideo";

export const VideoPlayer = () => {

  return (
    <View className="aspect-video w-full max-h-52 bg-gray-800 justify-center">
      <View className="flex-1 justify-center items-center aspect-video">
        <NewPlayer />
      </View>
    </View>
  );
};
