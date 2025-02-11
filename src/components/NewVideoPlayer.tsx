import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const videoSource =
  "https://rtisoluctions.com.br/hls/test.m3u8";

export default function NewVideoPlayer() {
  const [onFullScreen, setOnFullScreen] = useState(false);
  const [isPictureInPicture, SetIsPictureInPicture] = useState(false);

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = false;
    player.volume = 0.8;
    player.audioMixingMode = 'duckOthers';
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { muted } = useEvent(player, 'mutedChange', { muted: player.muted });



  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} nativeControls={false} allowsPictureInPicture={isPictureInPicture} />
      <View style={styles.controlsContainer}>
        <View
          style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color='white' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => player.muted = !player.muted} >
            <Ionicons name={muted ? 'volume-mute' : 'volume-high'} size={24} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <Text className='font-thin text-slate-100'>{player.currentLiveTimestamp}</Text>
          <TouchableOpacity
              onPress={onFullScreenStart}
          >
            <Ionicons name={onFullScreen ? 'expand' : 'contract'} size={24} color='white' />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: "96%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    aspectRatio: 16 / 9,
    borderRadius: 2,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  video: {
    marginTop: 16,
    width: 386,
    aspectRatio: 16 / 9,
  },
  controlsContainer: {
    width: '100%',
    padding: 10,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
});
