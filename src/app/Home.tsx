import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Divisor } from "../components/Divisor";
import { PlayerContainer } from "../components/PlayerContainer";
import logoPop from "../../assets/logo-pop.png";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export const Home = () => {
  NetInfo.fetch().then((state) => {
    if (state.type === "cellular") {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Alerta de conexão',
        text2: 'Você está usando dados móveis!',
      });
    } else if (state.type === "wifi") {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Alerta de conexão',
        text2: 'Você está conectado a uma rede wifi!',
      });
    }
  });



  return (
    <View className="flex-1 bg-gray-800 flex-col items-center">
      <View className="flex-2 flex-row pt-16 pb-2 justify-center items-center gap-4">
        <TouchableOpacity>
          <Image className="w-24 h-10" source={logoPop} />
        </TouchableOpacity>
      </View>
      <Divisor />
      <PlayerContainer />
      <View className="bg-gray-900 flex-7 justify-center items-center p-4 absolute bottom-0 w-full">
        <Text className="text-white font-thin text-sm bg-gray-900">
          ©copyrigth www.pop.tv.br 2024
        </Text>
      </View>
      <Toast visibilityTime={4000} autoHide={true} />
    </View>
  );
};
