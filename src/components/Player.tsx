import React, { useCallback } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  View,
  useWindowDimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import slidePop from "../../assets/slide-pop.png";
import { useAppContext } from "../context/AppContext";
import * as ScreenOrientation from "expo-screen-orientation";

const VIDEO_HEIGHT = 180;
const SCREEN_SPACE = 24;

export const VideoPlayer = () => {
  const [loadError, setLoadError] = React.useState(false);

  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - SCREEN_SPACE * 2;

  return (
    <View className="aspect-video w-full max-h-52 bg-gray-800 justify-center">
      <View className="flex-1 justify-center items-center">
        {loadError ? (
          <View className="absolute inset-0 flex justify-center items-center">
            <Image
              source={slidePop}
              style={{
                width: VIDEO_WIDTH,
                height: VIDEO_HEIGHT,
                backgroundColor: "transparent",
              }}
            />
          </View>
        ) : (
          <WebView
            source={{ uri: "https://abrir.link/QlXpr" }}
            style={{
              width: VIDEO_WIDTH,
              height: VIDEO_HEIGHT,
              backgroundColor: "transparent",
            }}
            allowUniversalAccessFromFileURLs={true}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={true}
            onError={() => {
              setLoadError(true);
              console.log("Error loading video");
            }}
            notFoundContent={"Error loading video"}
            scalesPageToFit={false}
            mediaPlaybackRequiresUserAction={false}
            allowingReadAccessToURL="https://abrir.link/QlXpr"
            allowsLinkPreview={true}
            allowsAirPlayForMediaPlayback={true}
            allowsPictureInPictureMediaPlayback={true}
            allowsBackForwardNavigationGestures={false}
          />
        )}
      </View>
    </View>
  );
};
