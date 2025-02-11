import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';

const videoSource =
  "https://rtisoluctions.com.br/hls/test.m3u8";

export default function NewVideoPlayer() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = false;
    player.volume = 0.8;
    player.audioMixingMode = 'duckOthers';
    player.duration
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} nativeControls={true}  allowsFullscreen startsPictureInPictureAutomatically />
      <View style={styles.controlsContainer}>
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
    width: 350,
    height: 275,
    borderRadius: 2,
  },
  controlsContainer: {
    padding: 10,
  },
});
