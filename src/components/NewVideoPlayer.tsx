import React, { useImperativeHandle, forwardRef, useCallback } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';

const STREAM_URL = "https://rtisoluctions.com.br/hls/test.m3u8";

export type VideoPlayerRef = {
  refresh: () => void;
};

const NewVideoPlayer = forwardRef<VideoPlayerRef>((_, ref) => {
  const player = useVideoPlayer(STREAM_URL, (p) => {
    p.loop = true;
    p.muted = false;
    p.volume = 0.8;
    p.audioMixingMode = 'duckOthers';
    p.play();
  });

  const refresh = useCallback(async () => {
    // Adiciona timestamp para forçar nova requisição ao HLS, evitando cache
    const freshUrl = `${STREAM_URL}?t=${Date.now()}`;
    await player.replaceAsync(freshUrl);
    player.play();
  }, [player]);

  useImperativeHandle(ref, () => ({ refresh }), [refresh]);

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} startsPictureInPictureAutomatically />
    </View>
  );
});

NewVideoPlayer.displayName = 'NewVideoPlayer';

export default NewVideoPlayer;

const styles = StyleSheet.create({
  contentContainer: {
    width: '96%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    aspectRatio: 16 / 9,
    borderRadius: 2,
  },
  video: {
    marginTop: 16,
    width: '96%',
    aspectRatio: 16 / 9,
  },
});
