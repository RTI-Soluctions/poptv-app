import Toast from "react-native-toast-message";
import logoPop from "../../assets/icon.png";
import { Navbar } from "../components/NavBar";
import { Divisor } from "../components/Divisor";
import { AboutUs } from "../components/AboutUs";
import { Videos } from "../components/Videos";
import { News } from "../components/News";
import { useAppContext } from "../context/AppContext";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { MainContainer } from "../components/MainContainer";
import { View, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as Burnt from "burnt";
import { Programation } from "../components/Programation";
import { Footer } from "../components/Footer";

export const Home = () => {
  const [key, setKey] = useState(0);
  const previousNetworkType = useRef<string | null>(null);
  const { isHome, isAboutUs, isPrograms, isVideos, isNews } = useAppContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Reinicia a key forçando o desmonte e recriação do componente de Vídeo (NewVideoPlayer)
    // Assim o Player baixa o stream HLS (m3u8) atualizado desde o começo
    setKey((prevKey) => prevKey + 1);

    // Tempo simulado de recarregamento
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Prevents the event from firing multiple times for the same network type state updates 
      // (like obtaining ip, internet reachability changes that fire repeatedly on app mount).
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
            <MainContainer key={key} />
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
