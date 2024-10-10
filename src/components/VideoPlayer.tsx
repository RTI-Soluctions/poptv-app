import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  Video as VideoComponent,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { useKeepAwake } from "expo-keep-awake";
import slidePop from "../../assets/slide-pop.png";
import { setAudioModeAsync } from "expo-av/build/Audio";
import * as Burnt from "burnt";

const Video: any = require("expo-av").Video;

const VIDEO_HEIGHT = 202;
const SCREEN_SPACE = 24;

export default function VideoPlayer() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const { width } = useWindowDimensions();
  const video = useRef<VideoComponent>(null);

  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setAudioModeAsync({
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playsInSilentModeIOS: true,
        });
        video.current?.playAsync();
        Burnt.toast({
          duration: 1,
          haptic: "error",
          title: "Bem vindo(a) de volta!",
          from: "bottom",
        });
      } else if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        setAudioModeAsync({
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
        });
        video.current?.playAsync();
        Burnt.toast({
          duration: 1,
          haptic: "error",
          title: "A Pop TV continua executando em segundo plano!",
          from: "bottom",
        });
      }

      appState.current = nextAppState;
      setKey((prevKey) => prevKey + 1);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setKey((prevKey) => prevKey + 1);

    setRefreshing(false);
  }, []);

  useKeepAwake();

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({ orientationInfo }) => {
        if (
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          video.current?.presentFullscreenPlayer();
        } else {
          video.current?.dismissFullscreenPlayer();
          video.current?.playAsync();
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  const onFullscreenUpdate = async ({ fullscreenUpdate }: any) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={slidePop}
        style={{
          position: "absolute",
          width: VIDEO_WIDTH,
          height: isLoading ? width / 1.9 : 0,
          borderRadius: 6,
          zIndex: isLoading ? 1 : -1,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Video
          ref={video}
          source={{
            uri: "https://pop.tv.br/hls/test.m3u8",
          }}
          shouldPlay={true}
          autoPlay={true}
          accessibilityLabel="Player exibindo a Pop TV de Sobradinho, Rio Grande do Sul Ao Vivo."
          playInBackground={true}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          onFullscreenUpdate={onFullscreenUpdate}
          backgroundImage={{
            uri: "https://www.pop.tv.br/assets/slide-pop.png",
          }}
          useNativeControls={true}
          resizeMode={ResizeMode.CONTAIN}
          isFullScreen={isFullscreen}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          style={{
            flex: 1,
            width: VIDEO_WIDTH,
            height: videoReady ? VIDEO_HEIGHT : 0,
            borderRadius: 6,
            zIndex: isLoading ? -1 : 1,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    aspectRatio: 16 / 9,
    borderRadius: 6,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
});
