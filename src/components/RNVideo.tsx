import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video as VideoComponent } from "expo-av";
import slidePop from "../../assets/slide-pop.png";

const Video: any = require("expo-av").Video;

const VIDEO_HEIGHT = 200;
const SCREEN_SPACE = 24;

export default function RNVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;

  const video = useRef<VideoComponent>(null);

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  const onFullscreenUpdate = async () => {
    if (video.current) {
      await video.current.presentFullscreenPlayer();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={slidePop}
        style={{
          position: "absolute",
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT + 8,
          borderWidth: 1,
          borderRadius: 6,
          zIndex: isLoading ? 1 : -1,
        }}
      />
      <Video
        ref={video}
        source={{
          uri: "https://ormartins-hls.secdn.net/ormartins-channel/play/ormartins.smil/playlist.m3u8",
        }}
        shouldPlay
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onFullscreenUpdate={onFullscreenUpdate}
        autoPlay
        useNativeControls={true}
        resizeMode={ResizeMode.COVER}
        isFullScreen={isFullscreen}
        style={{
          flex: 1,
          backgroundColor: "black",
          width: VIDEO_WIDTH,
          height: videoReady ? VIDEO_HEIGHT + 8 : 0,
          borderWidth: 1,
          borderRadius: 6,
          zIndex: isLoading ? -1 : 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
});
