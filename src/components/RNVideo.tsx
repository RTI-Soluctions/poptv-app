import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video as VideoComponent } from "expo-av";
import { useKeepAwake } from "expo-keep-awake";
import slidePop from "../../assets/slide-pop.png";

const Video: any = require("expo-av").Video;

const VIDEO_HEIGHT = 202;
const DEFAULT_IMAGE_HEIGHT = 202;
const SCREEN_SPACE = 24;

export default function RNVideo() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;
  const video = useRef<VideoComponent>(null);

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

  const onFullscreenUpdate = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();

    if (video.current) {
      if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        await video.current.presentFullscreenPlayer();
      } else {
        await video.current.dismissFullscreenPlayer();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={slidePop}
        style={{
          position: "absolute",
          width: VIDEO_WIDTH,
          height: isLoading ? DEFAULT_IMAGE_HEIGHT : VIDEO_HEIGHT,
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
            uri: "https://rtisoluctions.com.br/hls/test.m3u8",
          }}
          shouldPlay
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          onFullscreenUpdate={onFullscreenUpdate}
          autoPlay
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isFullScreen={isFullscreen}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
});
