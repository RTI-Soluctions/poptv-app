import React from "react";
import {
  ScrollViewComponent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";

export const Navbar = () => {
  const {
    isHome,
    isAboutUs,
    isPrograms,
    setIsHome,
    setIsAboutUs,
    setIsPrograms,
  } = useAppContext();

  const handleHome = () => {
    setIsHome(true);
    setIsAboutUs(false);
    setIsPrograms(false);
  };

  const handlePrograms = () => {
    setIsHome(false);
    setIsPrograms(true);
    setIsAboutUs(false);
  };

  const handleAbout = () => {
    setIsHome(false);
    setIsPrograms(false);
    setIsAboutUs(true);
  };

  return (
    <React.Fragment>
      <View className="flex-row justify-center gap-x-4 bg-gray-900 w-full">
        <TouchableOpacity onPress={handleHome} className="p-1 ">
          <Text
            className="text-sm text-white"
            style={{
              fontWeight: isHome ? "bold" : "normal",
              color: isHome ? "white" : "gray",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrograms} className="p-1 ">
          <Text
            className="text-sm text-gray-100"
            style={{
              fontWeight: isPrograms ? "bold" : "normal",
              color: isPrograms ? "white" : "gray",
            }}
          >
            Programas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAbout} className="p-1 ">
          <Text
            className="text-sm text-gray-100"
            style={{
              fontWeight: isAboutUs ? "bold" : "normal",
              color: isAboutUs ? "white" : "gray",
            }}
          >
            Sobre
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};
