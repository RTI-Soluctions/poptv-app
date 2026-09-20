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
import { Alert, BackHandler, Platform, StyleSheet, View, Image, TouchableOpacity, RefreshControl, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationBar } from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import Animated from 'react-native-reanimated';
import { playerTransition } from '../components/playerTransition';
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
  const { width, height } = useWindowDimensions();
  const landscape = width > height;
  const [fullscreenDismissed, setFullscreenDismissed] = useState(false);
  const fullscreen = isHome && landscape && !fullscreenDismissed;

  useEffect(() => {
    if (Platform.OS === 'web') return;
    // SENSOR allows physical rotation on Android, including when the system
    // preference is portrait. Restore the app default outside the live screen.
    const orientation = isHome && Platform.OS === 'android'
      ? ScreenOrientation.lockPlatformAsync({ screenOrientationConstantAndroid: 4 })
      : ScreenOrientation.unlockAsync();
    void orientation.catch((error) => console.warn('Não foi possível liberar a rotação:', error));
  }, [isHome]);

  useEffect(() => {
    if (!landscape || !isHome) setFullscreenDismissed(false);
  }, [landscape, isHome]);

  useEffect(() => {
    if (Platform.OS !== "android") return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (fullscreen) {
        setFullscreenDismissed(true);
        return true;
      }
      if (!actionInProgress.current) setExitVisible(true);
      return true;
    });
    return () => subscription.remove();
  }, [fullscreen]);

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
      <StatusBar style="light" hidden={fullscreen} />
      <NavigationBar hidden={fullscreen} />
      <ExitModal visible={exitVisible} onClose={() => chooseExitAction("close")} onMinimize={() => chooseExitAction("pip")} onDismiss={() => setExitVisible(false)} />
      <SafeAreaView style={styles.container} edges={fullscreen ? [] : ['top', 'bottom', 'left', 'right']}>
        <View style={[styles.header, fullscreen && styles.hidden]}>
          <TouchableOpacity>
            <Image style={styles.logo} source={logoPop} />
          </TouchableOpacity>
          <Toast visibilityTime={4000} autoHide={true} position="top" />
        </View>
        {!fullscreen && <Divisor />}
        {isHome && (
          <Animated.ScrollView
            layout={playerTransition}
            removeClippedSubviews={false}
            style={[styles.scrollView, fullscreen && styles.fullscreenScroll]}
            contentContainerStyle={fullscreen ? styles.fullscreenContent : undefined}
            scrollEnabled={!fullscreen}
            refreshControl={
              <RefreshControl
                enabled={!fullscreen}
                refreshing={!fullscreen && refreshing}
                onRefresh={onRefresh}
                tintColor="#ffffff"
                colors={["#ffffff"]}
                progressBackgroundColor="#000000"
              />
            }
          >
            <MainContainer ref={mainContainerRef} fullscreen={fullscreen} />
          </Animated.ScrollView>
        )}
        {isPrograms && <Programation />}
        {isAboutUs && <AboutUs />}
        {isVideos && <Videos />}
        {isNews && <News />}

        {/* Navigation Bar fixada no fundo */}
        {!fullscreen && <Navbar />}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  hidden: { display: 'none' },
  fullscreenScroll: { marginLeft: 0 },
  fullscreenContent: { flex: 1 },
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
    paddingTop: 16,
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
