import { Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";

export const Navbar = () => {
  const {
    isHome,
    isAboutUs,
    isContact,
    setIsHome,
    setIsAboutUs,
    setIsContact,
  } = useAppContext();

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
        <TouchableOpacity onPress={handleAboutUs} className="p-1 ">
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
        <TouchableOpacity onPress={handleContact} className="p-1 ">
          <Text
            className="text-sm text-gray-100"
            style={{
              fontWeight: isContact ? "bold" : "normal",
              color: isContact ? "white" : "gray",
            }}
          >
            Contato
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
