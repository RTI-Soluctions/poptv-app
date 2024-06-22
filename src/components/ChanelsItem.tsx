import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styled } from "nativewind";
import { IChannel } from "../database/channels_db";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

export const ChannelItem: React.FC<{ channel: IChannel }> = ({ channel }) => (
  <StyledSafeAreaView className="flex-1 items-center mt-4 bg-gray-800 p-4 w-[320px] ml-[50]">
    <StyledView className="mb-3 p-4 rounded-lg bg-gray-700 shadow scroll-m-5 border-blue-500 border-b-2  border-r-2 w-full">
      <StyledText className="text-lg font-bold mb-2 text-gray-100">
        {channel.city}
      </StyledText>
      <StyledText className="text-base mb-[1px] text-gray-100">
        Canal: {channel.channel}
      </StyledText>
    </StyledView>
  </StyledSafeAreaView>
);
