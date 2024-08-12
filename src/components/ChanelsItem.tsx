import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styled } from "nativewind";
import { IChannel } from "../database/channels_db";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

export const ChannelItem: React.FC<{ channel: IChannel }> = ({ channel }) => (
  <StyledSafeAreaView className="flex-1 justify-center items-center text-center bg-gray-900 w-[300px]">
    <StyledView className="mb-3 ml-[60%] p-4 rounded-lg bg-gray-700 shadow scroll-m-5 border-blue-500 border-b-2  border-r-2 w-full">
      <StyledText className="text-base font-bold mb-2 text-white">
        {channel.city}
      </StyledText>
      <StyledText className="text-sm mb-[1px] text-gray-100">
        Canal: {channel.channel}
      </StyledText>
    </StyledView>
  </StyledSafeAreaView>
);
