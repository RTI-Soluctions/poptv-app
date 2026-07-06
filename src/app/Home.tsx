import Toast from "react-native-toast-message";
import logoPop from "../../assets/icon.png";
import { Navbar } from "../components/NavBar";
import { Divisor } from "../components/Divisor";
import { AboutUs } from "../components/AboutUs";
import { Videos } from "../components/Videos";
import { News } from "../components/News";
import { useAppContext } from "../context/AppContext";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { MainContainer, MainContainerRef } from "../components/MainContainer";
import { View, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as Burnt from "burnt";
import { Programation } from "../components/Programation";

export const Home = () => {
  const mainContainerRef = useRef<MainContainerRef>(null);
  const previousNetworkType = useRef<string | null>(null);
  const { isHome, isAboutUs, isPrograms, isVideos, isNews } = useAppContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    mainContainerRef.current?.refreshPlayer();

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (previousNetworkType.current !== state.type) {
        previousNetworkType.current = state.type;

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
            haptic: "error",
            title: "Você está conectado a uma rede wifi!",
            from: "bottom",
          });
        } else if (state.type === "none" || !state.isConnected) {
          Burnt.toast({
            duration: 1,
            haptic: "error",
            title: "Você está offline!",
            from: "bottom",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <React.Fragment>
      <View className="flex-1 bg-black flex-col items-center">
        <View className="flex-2 flex-row pt-12 pb-2 justify-center items-center gap-4">
          <TouchableOpacity>
            <Image className="w-24 h-16" source={logoPop} />
          </TouchableOpacity>
          <Toast visibilityTime={4000} autoHide={true} position="top" />
        </View>
        <Divisor />
        {isHome && (
          <ScrollView
            className="flex-1 w-full ml-4"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#ffffff"
                colors={["#ffffff"]}
                progressBackgroundColor="#000000"
              />
            }
          >
            <MainContainer ref={mainContainerRef} />
          </ScrollView>
        )}
        {isPrograms && <Programation />}
        {isAboutUs && <AboutUs />}
        {isVideos && <Videos />}
        {isNews && <News />}

        {/* Navigation Bar fixada no fundo */}
        <Navbar />
      </View>
    </React.Fragment>
  );
};
