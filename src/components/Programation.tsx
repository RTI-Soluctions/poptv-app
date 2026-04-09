import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Programs } from "../database/programs_db";
import { Footer } from "./Footer";

const daysMap: Record<number, string> = {
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
  7: "Dom",
};

const getDayLabel = (num: number) => daysMap[num] || "";

export const Programation = () => {
  return (
    <ScrollView className="flex-1 w-full">
      <View className="px-5 mt-6 mb-16 w-full">
        {Programs.map((program, index) => (
          <View
            key={index}
            className="mb-8 bg-[#1c1c1e] rounded-2xl overflow-hidden border border-white/5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 8,
            }}
          >
            {/* Imagem do Programa */}
            <View className="w-full h-48 bg-[#2a2a2d]">
              <Image
                source={program.image as ImageSourcePropType}
                className="w-full h-full object-cover"
              />
            </View>

            {/* Conteúdo do Card */}
            <View className="p-5">
              <View className="flex-row justify-between items-start mb-4">
                <Text
                  className="font-bold text-xl text-white flex-1 mr-4 tracking-wide"
                  numberOfLines={2}
                >
                  {program.name}
                </Text>

                {/* Horário (Badge de cor de destaque) */}
                <View className="bg-[#1bafff]/20 px-3 py-1.5 rounded-lg border border-[#1bafff]/30">
                  <Text className="text-[#1bafff] font-bold text-sm">
                    {program.start} - {program.end}
                  </Text>
                </View>
              </View>

              {/* Dias da Semana (Pills) */}
              <View className="flex-row flex-wrap gap-2">
                {program.days.map((day, idx) => (
                  <View
                    key={idx}
                    className="bg-white/10 px-3 py-1.5 rounded-lg"
                  >
                    <Text className="font-semibold text-xs text-gray-300 uppercase tracking-widest">
                      {getDayLabel(day)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
      <Footer />
    </ScrollView>
  );
};
