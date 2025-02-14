import { Text, View } from "react-native";
import { Divisor } from "./Divisor";

export const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <View className="absolute left-0 bottom-0 right-0 w-full flex-col items-center">
      <Divisor />
      <View className="h-10 w-full flex-row items-center justify-center bg-gray-900">
        <Text className="text-center text-white text-xs">
          © {thisYear} Pop TV. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
};
