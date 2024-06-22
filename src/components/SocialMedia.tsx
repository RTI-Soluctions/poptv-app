import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import facebookIcon from "../../assets/facebook-icon.png";
import instagramIcon from "../../assets/instagram-icon.png";
import youtubeIcon from "../../assets/youtube-icon.png";
import xIcon from "../../assets/x-icon.png";

export const SocialMedia = () => {
  const handleFace = () => {
    Linking.openURL("https://www.facebook.com");
  };

  const handleInsta = () => {
    Linking.openURL("https://www.instagram.com");
  };

  const handleYoutube = () => {
    Linking.openURL("https://www.youtube.com");
  };

  const handleX = () => {
    Linking.openURL("https://www.x.com");
  };

  return (
    <View className="mb-[-16px]">
      <Text className="text-center text-2xl font-bold text-gray-200 mt-4 mb-4">
        Nossas Redes
      </Text>
      <View className="flex-row items-center justify-center bg-gray-800 w-[400] gap-6 mt-2 ">
        <TouchableOpacity
          onPress={handleFace}
          className="bg-gray-100 rounded-md flex-col justify-center items-center"
        >
          <Image source={facebookIcon} className="w-12 h-12" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleInsta}
          className="bg-gray-100 rounded-md flex-col justify-center items-center"
        >
          <Image source={instagramIcon} className="w-12 h-12" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleYoutube}
          className="bg-gray-100 rounded-md flex-col justify-center items-center"
        >
          <Image source={youtubeIcon} className="w-12 h-12" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleX}
          className="bg-gray-100 rounded-md flex-col justify-center items-center"
        >
          <Image source={xIcon} className="w-12 h-12" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
