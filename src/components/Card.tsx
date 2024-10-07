import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { Program } from "../database/programs_db";

type ProgramProps = {
  program: Program;
  index: number;
};

export const Card = ({ program, index }: ProgramProps) => {
  return (
    <View
      key={index}
      className="mb-4 p-4 border border-gray-200 rounded-lg w-[90%]"
    >
      <Image
        source={{ uri: program.image }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
          resizeMode: "contain",
        }}
      />
      <View className="flex-row justify-between ">
        <Text className="font-bold text-xl text-left pt-5 text-white">
          {program.name}
        </Text>
        <Text className="font-normal text-base text-left pt-5 text-gray-400 ">
          {program.start} - {program.end}
        </Text>
      </View>
    </View>
  );
};
