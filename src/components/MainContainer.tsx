import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewVideoPlayer, { VideoPlayerRef } from './NewVideoPlayer';

export type MainContainerRef = {
  refreshPlayer: () => void;
  startPictureInPicture: () => Promise<void>;
  pause: () => void;
};

export const MainContainer = forwardRef<MainContainerRef>((_, ref) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Ao Vivo</Text>
      <NewVideoPlayer ref={playerRef} />
    </View>
  );
});

MainContainer.displayName = 'MainContainer';

const styles = StyleSheet.create({
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
