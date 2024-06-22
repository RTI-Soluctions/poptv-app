import React from "react";
import { View, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";
import slidePop from "../../assets/slide-pop.png";

const VIDEO_HEIGHT = 180;
const SCREEN_SPACE = 24;

export const VideoPlayer = () => {
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;

  return (
    <View className="aspect-video w-full max-h-52 bg-gray-800 justify-center">
      <View className="flex-1 justify-center items-center">
        <WebView
          style={{
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            backgroundColor: "transparent",
          }}
          source={{
            html: `
          <iframe
          src="http://srv26513565.ultasrv.com:8080/hls/test.m3u8"
          allowfullscreen
          webkitallowfullscreen
          mozallowfullscreen
          oallowfullscreen
          msallowfullscreen
          frameborder="0"
          style="width: 100%; height: 100%; background-image: url(${slidePop}); "
          border="0"
          allow="autoplay"
          ></iframe>
          `,
          }}
        />
      </View>
    </View>
  );
};
