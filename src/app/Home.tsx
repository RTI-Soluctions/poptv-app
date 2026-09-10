import Toast from "react-native-toast-message";
import logoPop from "../../assets/Icon.png";
import { Navbar } from "../components/NavBar";
import { Divisor } from "../components/Divisor";
import { AboutUs } from "../components/AboutUs";
import { Videos } from "../components/Videos";
import { News } from "../components/News";
import { useAppContext } from "../context/AppContext";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { MainContainer, MainContainerRef } from "../components/MainContainer";
import { Alert, BackHandler, Platform, StyleSheet, View, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { ExitModal } from "../components/ExitModal";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as Burnt from "burnt";
import { Programation } from "../components/Programation";

export const Home = () => {
  const mainContainerRef = useRef<MainContainerRef>(null);
  const previousNetworkType = useRef<string | null>(null);
  const { isHome, isAboutUs, isPrograms, isVideos, isNews, setIsHome, setIsAboutUs, setIsPrograms, setIsVideos, setIsNews } = useAppContext();
  const [exitVisible, setExitVisible] = useState(false);
  const [exitAction, setExitAction] = useState<"close" | "pip" | null>(null);
  const actionInProgress = useRef(false);

  useEffect(() => {
    if (Platform.OS !== "android") return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!actionInProgress.current) setExitVisible(true);
      return true;
    });
    return () => subscription.remove();
  }, []);

  const chooseExitAction = (action: "close" | "pip") => {
    if (actionInProgress.current) return;
    actionInProgress.current = true;
    setExitVisible(false);
    if (action === "pip") {
      setIsHome(true);
      setIsAboutUs(false);
      setIsPrograms(false);
      setIsVideos(false);
      setIsNews(false);
    }
    setExitAction(action);
  };

  useEffect(() => {
    if (!exitAction) return;
    // Let the modal disappear and the live player mount before invoking native APIs.
    const frame = requestAnimationFrame(() => {
      const execute = async () => {
        try {
          if (exitAction === "close") {
            mainContainerRef.current?.pause();
            BackHandler.exitApp();
          } else {
            if (!mainContainerRef.current) throw new Error("Player indisponível");
            await mainContainerRef.current.startPictureInPicture();
          }
        } catch {
          Alert.alert("Janela flutuante indisponível", "Não foi possível iniciar o picture-in-picture. Verifique se esse recurso está permitido para o aplicativo nas configurações do Android.");
        } finally {
          actionInProgress.current = false;
          setExitAction(null);
        }
      };
      void execute();
    });
    return () => cancelAnimationFrame(frame);
  }, [exitAction]);

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
          mainContainerRef.current?.refreshPlayer();
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
      <ExitModal visible={exitVisible} onClose={() => chooseExitAction("close")} onMinimize={() => chooseExitAction("pip")} onDismiss={() => setExitVisible(false)} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image style={styles.logo} source={logoPop} />
          </TouchableOpacity>
          <Toast visibilityTime={4000} autoHide={true} position="top" />
        </View>
        <Divisor />
        {isHome && (
          <ScrollView
            style={styles.scrollView}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    backgroundColor: "#000000",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    paddingTop: 48,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  logo: {
    width: 96,
    height: 64
  },
  scrollView: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    width: "100%",
    marginLeft: 16
  }
});
