import React, { useImperativeHandle, forwardRef, useCallback, useRef, useEffect } from 'react';
import { useVideoPlayer, VideoView, isPictureInPictureSupported } from 'expo-video';
import { AppState, StyleSheet, View } from 'react-native';

const STREAM_URL = "https://rtisoluctions.com.br/hls/test.m3u8";

export type VideoPlayerRef = {
  refresh: () => void;
  startPictureInPicture: () => Promise<void>;
  pause: () => void;
};

const NewVideoPlayer = forwardRef<VideoPlayerRef>((_, ref) => {
  const videoViewRef = useRef<VideoView>(null);
  const inPictureInPicture = useRef(false);
  const needsRefresh = useRef(false);
  const refreshing = useRef(false);
  const mounted = useRef(true);
  const player = useVideoPlayer(STREAM_URL, (p) => {
    p.loop = true;
    p.muted = false;
    p.volume = 0.8;
    p.audioMixingMode = 'duckOthers';
    p.staysActiveInBackground = true;
    p.play();
  });

  const refresh = useCallback(async () => {
    if (refreshing.current || !mounted.current) return;
    refreshing.current = true;
    // Adiciona timestamp para forçar nova requisição ao HLS, evitando cache
    const freshUrl = `${STREAM_URL}?t=${Date.now()}`;
    try {
      await player.replaceAsync(freshUrl);
      if (mounted.current) player.play();
    } catch (error) {
      if (mounted.current) console.warn('Não foi possível atualizar a transmissão:', error);
    } finally {
      refreshing.current = false;
    }
  }, [player]);

  const refreshOnReturn = useCallback(() => {
    if (AppState.currentState === 'active' && !inPictureInPicture.current && needsRefresh.current) {
      needsRefresh.current = false;
      void refresh();
    }
  }, [refresh]);

  useEffect(() => {
    mounted.current = true;
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'background') needsRefresh.current = true;
      if (state === 'active') refreshOnReturn();
    });
    return () => {
      mounted.current = false;
      subscription.remove();
    };
  }, [refreshOnReturn]);

  useImperativeHandle(ref, () => ({
    refresh,
    pause: () => player.pause(),
    startPictureInPicture: async () => {
      if (!isPictureInPictureSupported() || !videoViewRef.current) {
        throw new Error('Picture-in-picture indisponível neste dispositivo.');
      }
      player.play();
      await videoViewRef.current.startPictureInPicture();
    },
  }), [refresh, player]);

  return (
    <View style={styles.contentContainer}>
      <VideoView
        ref={videoViewRef}
        style={styles.video}
        player={player}
        allowsPictureInPicture
        onPictureInPictureStart={() => {
          inPictureInPicture.current = true;
          needsRefresh.current = true;
        }}
        onPictureInPictureStop={() => {
          inPictureInPicture.current = false;
          refreshOnReturn();
        }}
      />
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
