import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { channels } from "../database/channels_db";
import { ChannelItem } from "./ChanelsItem";

export const CarouselComponent = () => {
  const width = Dimensions.get("window").width;
  return (
    <View className="bg-gray-900 w-full flex items-center mb-[-20px] ">
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={channels}
        scrollAnimationDuration={2000}
        renderItem={({ index }) => <ChannelItem channel={channels[index]} />}
      />
    </View>
  );
};
