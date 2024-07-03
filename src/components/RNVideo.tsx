import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { ResizeMode, VideoFullscreenUpdateEvent } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video as VideoComponent } from "expo-av";

const Video: any = require("expo-av").Video;

const VIDEO_HEIGHT = 200;
const SCREEN_SPACE = 24;

export default function RNVideo() {
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
      <Video
        source={{ uri: "http://srv26513565.ultasrv.com:8080/hls/test.m3u8" }}
        shouldPlay
        onReadyForDisplay={() => setVideoReady(true)}
        onFullscreenUpdate={onFullscreenUpdate}
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        isFullScreen={isFullscreen}
        style={{
          flex: 1,
          width: VIDEO_WIDTH,
          height: videoReady ? VIDEO_HEIGHT : 0,
          borderWidth: 1,
          borderRadius: 6,
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
