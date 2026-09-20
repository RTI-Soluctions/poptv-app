import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text } from 'react-native';
import NewVideoPlayer, { VideoPlayerRef } from './NewVideoPlayer';
import Animated from 'react-native-reanimated';
import { playerTransition } from './playerTransition';

export type MainContainerRef = {
  refreshPlayer: () => void;
  startPictureInPicture: () => Promise<void>;
  pause: () => void;
};

export const MainContainer = forwardRef<MainContainerRef, { fullscreen?: boolean }>(({ fullscreen = false }, ref) => {
  const playerRef = useRef<VideoPlayerRef>(null);

  useImperativeHandle(ref, () => ({
    pause: () => playerRef.current?.pause(),
    startPictureInPicture: async () => {
      if (!playerRef.current) throw new Error('O vídeo ainda não está pronto.');
      await playerRef.current.startPictureInPicture();
    },
    refreshPlayer: () => {
      playerRef.current?.refresh();
    },
  }));

  return (
    <Animated.View layout={playerTransition} style={[styles.container, fullscreen && styles.fullscreen]}>
      {!fullscreen && <Text style={styles.title}>Ao Vivo</Text>}
      <NewVideoPlayer ref={playerRef} fullscreen={fullscreen} />
    </Animated.View>
  );
});

MainContainer.displayName = 'MainContainer';

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    marginTop: 0,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 16,
    backgroundColor: "#000000"
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#ffffff"
  }
});
