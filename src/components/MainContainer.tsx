import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Divisor } from "./Divisor";
import { CarouselComponent } from "./Carousel";
import VideoPlayer from "./VideoPlayer";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as Burnt from "burnt";

export const MainContainer = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === "cellular") {
        Burnt.toast({
          duration: 1,
          haptic: "error",
          title: "Você está usando dados móveis!",
          from: "bottom",
        });

        setKey((prevKey) => prevKey + 1);
      } else if (state.type === "wifi") {
        Burnt.toast({
          duration: 1,
          haptic: "success",
          title: "Você está conectado a uma rede wifi!",
          from: "bottom",
        });
      }
    });

    NetInfo.fetch().then((state: NetInfoState) => {
      if (!state.isConnected) {
        Burnt.toast({
          duration: 1,
          haptic: "warning",
          title: "Você está offline!",
          from: "bottom",
        });
      }
    });

    return () => unsubscribe();
  }, []);

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
