import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { Epg, Epgs } from "../database/epg_db";

const checkCurrentProgram = () => {
  const now = new Date();
  const currentTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");
  const currentDay = now.getUTCDay();

  return Epgs.find((program) => {
    return (
      program.days.includes(currentDay) &&
      currentTime >= program.start &&
      currentTime <= program.end
    );
  });
};

export const Now = () => {
  const [program, setProgram] = useState({} as Epg);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgram = checkCurrentProgram();
      if (currentProgram) {
        setProgram(currentProgram);
      } else {
        setProgram({
          start: `${new Date().getHours()}:00`,
          end: `${new Date().getHours() + 1}:00`,
          days: [0],
          name: "Programação Pop TV - Reprise",
          description: "Sem informações",
        } as Epg);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-col justify-center items-center bg-gray-900 pt-4 w-full">
      {program && (
        <>
          <Text className="text-left text-2xl font-semibold w-[90%] text-gray-50">
            {program.name}
          </Text>
          <Text className="text-left text-base font-light w-[90%] text-gray-300">
            {program.start} - {program.end}
          </Text>
          {/* <Text className="text-justify text-lg font-normal w-[90%] mt-2 text-gray-300">
            {program.description}
          </Text> */}
        </>
      )}
    </View>
  );
};
