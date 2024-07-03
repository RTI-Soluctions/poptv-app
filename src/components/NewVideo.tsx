import React from "react";
import { Image, ToastAndroid, useWindowDimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import slidePop from "../../assets/slide-pop.png";

const VIDEO_HEIGHT = 200;
const SCREEN_SPACE = 24;

export default function NewPlayer() {
  const video = React.useRef(null);
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;

  return (
    <>
      <Video
        ref={video}
        source={{ uri: "http://srv26513565.ultasrv.com:8080/hls/test.m3u8" }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        resizeMode={ResizeMode.COVER}
        PosterComponent={() => (
          <Image
            source={slidePop}
            style={{
              width: VIDEO_WIDTH,
              height: VIDEO_HEIGHT,
              borderRadius: 6,
              backgroundColor: "transparent",
            }}
          />
        )}
        isLooping
        style={{
          flex: 1,
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          borderWidth: 1,
          borderColor: "#98a5b0",
          borderRadius: 6,
        }}
      />
    </>
  );
}
