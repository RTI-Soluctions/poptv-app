import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Text, View } from 'react-native';
import NewVideoPlayer, { VideoPlayerRef } from './NewVideoPlayer';

export type MainContainerRef = {
  refreshPlayer: () => void;
};

export const MainContainer = forwardRef<MainContainerRef>((_, ref) => {
  const playerRef = useRef<VideoPlayerRef>(null);

  useImperativeHandle(ref, () => ({
    refreshPlayer: () => {
      playerRef.current?.refresh();
    },
  }));

  return (
    <View className="flex-col justify-around mt-4 bg-black">
      <Text className="text-center text-xl font-bold text-white">Ao Vivo</Text>
      <NewVideoPlayer ref={playerRef} />
    </View>
  );
});

MainContainer.displayName = 'MainContainer';
