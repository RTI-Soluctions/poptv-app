import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    <View style={styles.container}>

      <TouchableOpacity onPress={() => handlePress('home')} style={styles.tab}>
        <Ionicons name={isHome ? "home" : "home-outline"} size={26} color={isHome ? "#1bafff" : "gray"} />
        <Text style={[styles.tabLabel, isHome && styles.activeTabLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('programs')} style={styles.tab}>
        <Ionicons name={isPrograms ? "tv" : "tv-outline"} size={26} color={isPrograms ? "#1bafff" : "gray"} />
        <Text style={[styles.tabLabel, isPrograms && styles.activeTabLabel]}>Programas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('videos')} style={styles.tab}>
        <Ionicons name={isVideos ? "play-circle" : "play-circle-outline"} size={28} color={isVideos ? "#1bafff" : "gray"} />
        <Text style={[styles.tabLabel, isVideos && styles.activeTabLabel]}>Vídeos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('news')} style={styles.tab}>
        <Ionicons name={isNews ? "newspaper" : "newspaper-outline"} size={28} color={isNews ? "#1bafff" : "gray"} />
        <Text style={[styles.tabLabel, isNews && styles.activeTabLabel]}>Notícias</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('aboutUs')} style={styles.tab}>
        <Ionicons name={isAboutUs ? "information-circle" : "information-circle-outline"} size={28} color={isAboutUs ? "#1bafff" : "gray"} />
        <Text style={[styles.tabLabel, isAboutUs && styles.activeTabLabel]}>Sobre</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  tab: {
    alignItems: "center"
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: "#9ca3af"
  },
  activeTabLabel: {
    color: "#1bafff",
    fontWeight: "700"
  }
});
