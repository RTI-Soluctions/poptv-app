import { Text, View } from "react-native";
import { Divisor } from "./Divisor";

export const Footer = () => {
  return (
    <View className="absolute left-0 bottom-0 right-0 w-full flex-col items-center">
      <Divisor />
      <View className="h-14 w-full flex-row items-center justify-center bg-gray-900">
        <Text className="text-center text-white">
          © 2024 Pop TV. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
};
