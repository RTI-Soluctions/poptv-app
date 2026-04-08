import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divisor } from "./Divisor";
import { useAppContext } from "../context/AppContext";
import { PolicyModal } from "./PolicyModal";

export const AboutUs = () => {
  const { isModalOpen, setIsModalOpen } = useAppContext();

  return (
    <ScrollView className="flex-1 w-96 pb-20">
      {isModalOpen && <PolicyModal />}
      {!isModalOpen && (
        <View className="flex-col my-8 p-2 mb-20">
          <View className="flex-col bg-black p-4 m-4 mt-[-16]">
            <Text className="text-2xl font-semibold text-white">Sobre Nós</Text>
            <Divisor />
            <Text className="text-justify text-sm text-white pt-4">
              A Porto Alegre 24h TV é uma emissora de televisão aberta em Porto Alegre e Bento Gonçalves no Canal 8.1 em Sobradinho-RS no canal 45.1.
            </Text>
            <Text className="text-justify text-sm text-white pt-4">
              Com o propósito de informar, entreter e enriquecer a cultura da
              comunidade, a Porto Alegre 24h TV apresenta uma programação diversificada,
              abrangendo jornalismo, entretenimento, cultura e lazer.
              Comprometida com a excelência, buscamos constantemente inovar e
              oferecer conteúdo de qualidade para nossos telespectadores.
            </Text>
            <Text className="text-justify text-sm text-white pt-4">
              A Porto Alegre 24h TV valoriza a privacidade e a proteção dos dados pessoais de
              seus usuários. Em conformidade com a Lei Geral de Proteção de
              Dados (LGPD), adotamos medidas rigorosas para garantir a segurança
              de suas informações. Para mais detalhes clique em Saiba Mais.
            </Text>
            <Divisor />
          </View>

          <Text className="text-justify text-sm text-white my-0 mx-8 mb-10">
            Para saber mais sobre a programação da Porto Alegre 24h TV,
            novidades e interagir conosco, acesse nosso site www.poa24horas.com.br
            ou entre em contato pelo email{" "}
            <Text
              className="text-[#1bafff] underline"
              onPress={() => Linking.openURL("mailto:contato@poa24horas.com.br")}
            >
              contato@poa24horas.com.br.
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(true);
            }}
          >
            <Text className="text-[#1bafff] text-sm ml-8 mt-[-16px]">
              Políticas de uso e de privacidade.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
