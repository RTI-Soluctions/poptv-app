import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Programs } from "../database/programs_db";

export const Programation = () => {
  return (
    <ScrollView className="flex-1 w-full">
      <View className="flex items-center mt-2">
        {Programs.map((program, index) => (
          <View
            key={index}
            className="mb-4 p-4 border border-gray-600 rounded-lg w-[90%]"
          >
            <Image
              source={program.image as ImageSourcePropType}
              className="w-full h-40 object-cover rounded mb-[-8px]"
            />
            <View className="flex-row justify-between ">
              <Text className="font-bold text-xl text-left pt-5 text-white">
                {program.name}
              </Text>
              <Text className="font-normal text-base text-left pt-5 text-gray-400 ">
                {program.start} - {program.end}
              </Text>
            </View>
            <View className="flex-row items-center gap-x-2 mt-2 mb-[-6px]">
              {program.days.map((day, index) => (
                <Text
                  key={index}
                  className=" flex-row h-full w-8 justify-center items-center text-center font-light text-xs text-white border border-gray-600 rounded-xl pt-[2px]"
                >
                  {day}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
