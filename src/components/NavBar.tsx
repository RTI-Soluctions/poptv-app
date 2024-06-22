import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";

export const Navbar = () => {
  const { setIsHome, setIsAboutUs, setIsContact } = useAppContext();

  const handleHome = () => {
    setIsHome(true);
    setIsAboutUs(false);
    setIsContact(false);
  };

  const handleAboutUs = () => {
    setIsHome(false);
    setIsAboutUs(true);
    setIsContact(false);
  };

  const handleContact = () => {
    setIsHome(false);
    setIsAboutUs(false);
    setIsContact(true);
  };

  return (
    <>
      <View className="flex-row justify-center gap-x-4 bg-gray-800 mt-[-12px] w-full">
        <TouchableOpacity onPress={handleHome} className="p-1 ">
          <Text className="text-lg text-gray-100">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAboutUs} className="p-1 ">
          <Text className="text-lg text-gray-100">Sobre</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContact} className="p-1 ">
          <Text className="text-lg text-gray-100">Contato</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
