import { Text, View } from "react-native";
import { Divisor } from "./Divisor";

export const Footer = () => {

  return (
    <View className="absolute left-0 bottom-0 right-0 w-full flex-col items-center">
      <Divisor />
      <View className="h-12 w-full flex-col items-center justify-center bg-black pb-3">
        <Text className="text-center text-white text-xs">
          © Porto Alegre 24 horas.
        </Text>
        <Text className="text-center text-white text-xs">
          Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
};
