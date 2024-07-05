import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { channels } from "../database/channels_db";
import { ChannelItem } from "./ChanelsItem";

export const CarouselComponent = () => {
  const width = Dimensions.get("window").width;
  return (
    <View className="bg-gray-800 w-[400] mt-2 mb-32">
      <View>
        <Text className="text-center text-2xl font-bold text-gray-200 mt-4 ">
          Já chegamos em:
        </Text>
      </View>
      <View>
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
    </View>
  );
};
