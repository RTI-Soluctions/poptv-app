import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Divisor } from "./Divisor";
import { aboutUs } from "../database/aboutus_db";

export const AboutUs = () => {
  return (
    <ScrollView className="flex-col my-8 p-2">
      {aboutUs.map((about) => (
        <View
          key={about.title}
          className="flex-col bg-gray-900 p-4 m-4 mt-[-16]"
        >
          <Text className="text-2xl font-semibold text-white">
            {about.title}
          </Text>
          <Divisor />
          <Text className="text-justify text-sm text-white">
            {about.content}
          </Text>
        </View>
      ))}
      <Divisor />

      <Text className="text-justify text-sm text-white my-0 mx-8 mt-4 mb-10">
        Para saber mais sobre a programação da Pop TV, novidades e interagir
        conosco, acesse nosso site www.pop.tv.br.
      </Text>
    </ScrollView>
  );
};
