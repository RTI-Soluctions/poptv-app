import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';

const videoSource =
  "https://rtisoluctions.com.br/hls/test.m3u8";

export default function NewVideoPlayer() {

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = false;
    player.volume = 0.8;
    player.audioMixingMode = 'duckOthers';
    player.status;
    player.play();
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} startsPictureInPictureAutomatically />
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
    width: "96%",
    aspectRatio: 16 / 9,
  },
});
