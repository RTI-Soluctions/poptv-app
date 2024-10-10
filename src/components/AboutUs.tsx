import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { Divisor } from "./Divisor";
import { useAppContext } from "../context/AppContext";
import { PolicyModal } from "./PolicyModal";

export const AboutUs = () => {
  const { isModalOpen, setIsModalOpen } = useAppContext();

  return (
    <React.Fragment>
      {isModalOpen && <PolicyModal />}
      {!isModalOpen && (
        <View className="flex-col my-8 p-2">
          <View className="flex-col bg-gray-900 p-4 m-4 mt-[-16]">
            <Text className="text-2xl font-semibold text-white">Sobre Nós</Text>
            <Divisor />
            <Text className="text-justify text-sm text-white pt-4">
              A Pop TV é uma emissora de televisão aberta, com sede em
              Sobradinho-RS, que atinge também a cidade de Porto Alegre-RS,
              respectivamente nos canais 45.1 e 23.1.
            </Text>
            <Text className="text-justify text-sm text-white pt-4">
              Com o propósito de informar, entreter e enriquecer a cultura da
              comunidade, a Pop TV apresenta uma programação diversificada,
              abrangendo jornalismo, entretenimento, cultura e lazer.
              Comprometida com a excelência, buscamos constantemente inovar e
              oferecer conteúdo de qualidade para nossos telespectadores.
            </Text>
            <Text className="text-justify text-sm text-white pt-4">
              A Pop TV valoriza a privacidade e a proteção dos dados pessoais de
              seus usuários. Em conformidade com a Lei Geral de Proteção de
              Dados (LGPD), adotamos medidas rigorosas para garantir a segurança
              de suas informações. Para mais detalhes clique em Saiba Mais.
            </Text>
            <Divisor />
          </View>

          <Text className="text-justify text-sm text-white my-0 mx-8 mb-10">
            Para saber mais sobre a programação da Pop TV, novidades e interagir
            conosco, acesse nosso site www.pop.tv.br ou entre em contato pelo
            email{" "}
            <Text
              className="text-[#1bafff] underline"
              onPress={() => Linking.openURL("mailto:contato@poptv.com.br")}
            >
              contato@pop.tv.br.
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(true);
              console.log("Clicou para abrir o modal.");
            }}
          >
            <Text className="text-[#1bafff] text-sm ml-8 mt-[-16px]">
              Políticas de uso e de privacidade.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  );
};
