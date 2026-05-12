import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";

export const Navbar = () => {
  const {
    isHome,
    isAboutUs,
    isPrograms,
    isVideos,
    isNews,
    setIsHome,
    setIsAboutUs,
    setIsPrograms,
    setIsVideos,
    setIsNews,
  } = useAppContext();

  const handlePress = (tab: string) => {
    setIsHome(tab === 'home');
    setIsVideos(tab === 'videos');
    setIsPrograms(tab === 'programs');
    setIsNews(tab === 'news');
    setIsAboutUs(tab === 'aboutUs');
  };

  return (
    <View className="flex-row justify-between items-center bg-[#1c1c1e] w-full pt-3 pb-8 px-8 border-t border-white/10">

      <TouchableOpacity onPress={() => handlePress('home')} className="items-center">
        <Ionicons name={isHome ? "home" : "home-outline"} size={26} color={isHome ? "#1bafff" : "gray"} />
        <Text className={`text-[10px] mt-1 ${isHome ? "text-[#1bafff] font-bold" : "text-gray-400"}`}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('programs')} className="items-center">
        <Ionicons name={isPrograms ? "tv" : "tv-outline"} size={26} color={isPrograms ? "#1bafff" : "gray"} />
        <Text className={`text-[10px] mt-1 ${isPrograms ? "text-[#1bafff] font-bold" : "text-gray-400"}`}>Programas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('videos')} className="items-center">
        <Ionicons name={isVideos ? "play-circle" : "play-circle-outline"} size={28} color={isVideos ? "#1bafff" : "gray"} />
        <Text className={`text-[10px] mt-1 ${isVideos ? "text-[#1bafff] font-bold" : "text-gray-400"}`}>Vídeos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('news')} className="items-center">
        <Ionicons name={isNews ? "newspaper" : "newspaper-outline"} size={28} color={isNews ? "#1bafff" : "gray"} />
        <Text className={`text-[10px] mt-1 ${isNews ? "text-[#1bafff] font-bold" : "text-gray-400"}`}>Notícias</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('aboutUs')} className="items-center">
        <Ionicons name={isAboutUs ? "information-circle" : "information-circle-outline"} size={28} color={isAboutUs ? "#1bafff" : "gray"} />
        <Text className={`text-[10px] mt-1 ${isAboutUs ? "text-[#1bafff] font-bold" : "text-gray-400"}`}>Sobre</Text>
      </TouchableOpacity>

    </View>
  );
};
