import React from "react";
import { ScrollView, View } from "react-native";
import RNVideo from "./RNVideo";

export const VideoPlayer = () => {
  return (
    <ScrollView className="aspect-video w-full max-h-52 bg-gray-800 flex-1">
      <View className="flex-1 justify-center items-center aspect-video">
        <RNVideo />
      </View>
    </ScrollView>
  );
};
