import React, { useImperativeHandle, forwardRef, useCallback, useRef, useEffect, useState } from 'react';
import { useEvent } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useVideoPlayer, VideoView, isPictureInPictureSupported } from 'expo-video';
import { AppState, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { playerTransition } from './playerTransition';

const STREAM_URL = "https://rtisoluctions.com.br/hls/test.m3u8";

export type VideoPlayerRef = {
  refresh: () => void;
  startPictureInPicture: () => Promise<void>;
  pause: () => void;
};

const NewVideoPlayer = forwardRef<VideoPlayerRef, { fullscreen?: boolean }>(({ fullscreen = false }, ref) => {
  const videoViewRef = useRef<VideoView>(null);
  const inPictureInPicture = useRef(false);
  const needsRefresh = useRef(false);
  const refreshing = useRef(false);
  const mounted = useRef(true);
  const wantsPlayback = useRef(true);
  const [playbackRequested, setPlaybackRequested] = useState(true);
  const [pipActive, setPipActive] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showControls = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    setControlsVisible(true);
    hideControlsTimer.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  useEffect(() => {
    if (pipActive) setControlsVisible(false);
    else showControls();
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, [pipActive, showControls]);
  const player = useVideoPlayer(STREAM_URL, (p) => {
    p.loop = true;
    p.muted = false;
    p.volume = 0.8;
    p.audioMixingMode = 'duckOthers';
    p.staysActiveInBackground = true;
    p.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const pause = useCallback(() => {
    wantsPlayback.current = false;
    setPlaybackRequested(false);
    player.pause();
  }, [player]);

  const togglePlayback = () => {
    showControls();
    if (player.playing) {
      pause();
    } else {
      wantsPlayback.current = true;
      setPlaybackRequested(true);
      player.play();
    }
  };

  // PiP/system controls can also change playback outside our custom button.
  useEffect(() => {
    const subscription = player.addListener('playingChange', ({ isPlaying: playing }) => {
      // Loading is not a user pause: keep automatic PiP enabled while buffering.
      if (!refreshing.current && (playing || player.status === 'readyToPlay')) {
        wantsPlayback.current = playing;
        setPlaybackRequested(playing);
      }
    });
    return () => subscription.remove();
  }, [player]);

  const refresh = useCallback(async () => {
    if (refreshing.current || !mounted.current) return;
    refreshing.current = true;
    // Adiciona timestamp para forçar nova requisição ao HLS, evitando cache
    const freshUrl = `${STREAM_URL}?t=${Date.now()}`;
    try {
      await player.replaceAsync(freshUrl);
      if (mounted.current && wantsPlayback.current) player.play();
    } catch (error) {
      if (mounted.current) console.warn('Não foi possível atualizar a transmissão:', error);
    } finally {
      refreshing.current = false;
    }
  }, [player]);

  const refreshOnReturn = useCallback(() => {
    if (AppState.currentState === 'active' && !inPictureInPicture.current && needsRefresh.current) {
      needsRefresh.current = false;
      if (wantsPlayback.current) void refresh();
    }
  }, [refresh]);

  useEffect(() => {
    mounted.current = true;
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'background' && !inPictureInPicture.current) needsRefresh.current = true;
      if (state === 'active') refreshOnReturn();
    });
    return () => {
      mounted.current = false;
      subscription.remove();
    };
  }, [refreshOnReturn]);

  useImperativeHandle(ref, () => ({
    refresh,
    pause,
    startPictureInPicture: async () => {
      if (!isPictureInPictureSupported() || !videoViewRef.current) {
        throw new Error('Picture-in-picture indisponível neste dispositivo.');
      }
      wantsPlayback.current = true;
      setPlaybackRequested(true);
      player.play();
      await videoViewRef.current.startPictureInPicture();
    },
  }), [refresh, player, pause]);

  return (
    <Animated.View
      layout={pipActive ? undefined : playerTransition}
      style={[styles.contentContainer, fullscreen && styles.fullscreen]}
    >
      <VideoView
        ref={videoViewRef}
        style={styles.video}
        player={player}
        nativeControls={false}
        fullscreenOptions={{ enable: false }}
        contentFit="contain"
        surfaceType="textureView"
        playsInline
        allowsPictureInPicture
        startsPictureInPictureAutomatically={playbackRequested}
        onPictureInPictureStart={() => {
          inPictureInPicture.current = true;
          setPipActive(true);
          needsRefresh.current = false;
        }}
        onPictureInPictureStop={() => {
          inPictureInPicture.current = false;
          setPipActive(false);
          refreshOnReturn();
        }}
      />
      {!pipActive && (
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="Mostrar controle de reprodução"
          onPress={showControls}
        />
      )}
      {!pipActive && controlsVisible && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pausar transmissão' : 'Reproduzir transmissão'}
          onPress={togglePlayback}
          hitSlop={12}
          style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={22} color="#ffffff" />
        </Pressable>
      )}
    </Animated.View>
  );
});

NewVideoPlayer.displayName = 'NewVideoPlayer';

export default NewVideoPlayer;

const styles = StyleSheet.create({
  contentContainer: {
    width: '96%',
    alignSelf: 'center',
    marginTop: 16,
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  fullscreen: {
    flex: 1,
    width: '100%',
    marginTop: 0,
    aspectRatio: undefined,
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  playButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -20,
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  pressed: {
    opacity: 0.65,
  },
});
