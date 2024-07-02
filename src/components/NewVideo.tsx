import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import slidePop from "../../assets/slide-pop.png";

const VIDEO_HEIGHT = 200;
const SCREEN_SPACE = 24;

export default function NewPlayer() {
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;

  return (
    <Video
      source={{ uri: "http://srv26513565.ultasrv.com:8080/hls/test.m3u8" }}
      rate={1.0}
      volume={1.0}
      useNativeControls
      isMuted={false}
      shouldPlay
      PosterComponent={() => (
        <Image
          source={slidePop}
          style={{
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            backgroundColor: "transparent",
          }}
        />
      )}
      isLooping
      style={{
        flex: 1,
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        borderRadius: 6,
      }}
    />
  );
}
