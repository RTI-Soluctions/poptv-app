import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import CloseIcon from "../../assets/close-icon.png";
import { Divisor } from "./Divisor";

export const PolicyModal = () => {
  const { setIsModalOpen } = useAppContext();

  return (
    <ScrollView className="flex-col mb-16">
      <View className="flex-col bg-black p-4 m-4">
        <TouchableOpacity
          onPress={() => {
            setIsModalOpen(false);
          }}
          className="w-full flex-row justify-end p-2"
        >
          <Image source={CloseIcon} className="w-5 h-5" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-white mt-5">
          Política de Privacidade e Proteção de Dados - Porto Alegre 24h TV
        </Text>

        <Text className="text-justify text-sm text-white pt-4">
          Na Porto Alegre 24h TV, estamos comprometidos com a proteção da privacidade e dos
          dados pessoais dos nossos usuários. Esta política foi elaborada de
          acordo com as <Text className="font-bold">Diretrizes de Privacidade</Text>, além da Lei Geral de Proteção de Dados (LGPD), e tem como objetivo esclarecer como lidamos com as informações do aplicativo.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          1. Coleta de Dados Pessoais
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          O aplicativo Porto Alegre 24h TV valoriza a sua privacidade e, por princípio,{" "}
          <Text className="font-bold">não coleta, armazena ou transmite seus dados pessoais diretamente</Text>.
          Não solicitamos informações como nome, endereço, telefone, e-mail, senhas ou qualquer outro dado sensível que possa
          identificar o usuário. O aplicativo não requer a criação de conta ou login para seu funcionamento.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          2. Bibliotecas de Terceiros e Telemetria
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Para garantir o bom funcionamento e aprimorar a estabilidade do aplicativo, utilizamos bibliotecas de terceiros necessárias para sua construção.
          É possível que essas tecnologias coletem dados automáticos de <Text className="font-bold">telemetria de forma anonimizada</Text>, tais como:
          {"\n"}• Informações de falhas e erros de software (crash logs);
          {"\n"}• Estatísticas básicas de desempenho do aplicativo;
          {"\n"}• Informações genéricas sobre o dispositivo e sistema operacional.
          {"\n\n"}
          Essas informações não são associadas à sua identidade e servem estritamente para que nossos desenvolvedores possam corrigir bugs e melhorar a sua experiência de uso, respeitando integralmente as políticas das plataformas de distribuição de aplicativos.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          3. Compartilhamento de Dados
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Como nossa aplicação não coleta seus dados pessoais, elaboramos esta aba para deixar claro que <Text className="font-bold">nenhuma informação sua é compartilhada, vendida ou repassada a terceiros</Text> para fins de publicidade direcionada, marketing ou comercialização.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          4. Segurança da Informação
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          O conteúdo fornecido pelo nosso aplicativo (transmissões de vídeo e grade de programação) é entregue através de conexões de rede seguras. Quaisquer dados de diagnóstico e telemetria coletados pelas bibliotecas de base respeitam os protocolos rigorosos de segurança e criptografia exigidos pelas lojas de aplicativos.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          5. Alterações na Política de Privacidade
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Esta política poderá ser atualizada periodicamente para assegurar a
          conformidade com novas leis, regulamentos ou mudanças técnicas no nosso próprio aplicativo.
          Recomendamos que você revise esse documento esporadicamente ao atualizar o app pela loja oficial.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          6. Contato
        </Text>
        <Text className="text-justify text-sm text-white pt-4 mb-8">
          Caso você tenha dúvidas sobre esta política de não coleta, sobre a telemetria utilizada ou queira nos contatar para
          mais informações, fale com nossa equipe de suporte pelo e-mail:
          <Text
            className="text-[#1bafff] font-bold"
            onPress={() => Linking.openURL("mailto:contato@poa24horas.com.br")}
          >
            {" "}contato@poa24horas.com.br
          </Text>
          .
        </Text>

        <Divisor />

        <Text className="text-sm font-semibold text-[#888888] mt-8">
          A Porto Alegre 24h - CNPJ: 35.133.051/0001-76
        </Text>
        <Text className="text-justify text-xs text-[#888888] pt-1 mb-6">
          Última atualização: 16 de março de 2026.
        </Text>

        <View className="flex-col items-center mt-2 pb-6 border-t border-[#333333] pt-4">
          <Text className="text-xs text-[#666666]">
            Desenvolvido e publicado por
          </Text>
          <Text className="text-xs font-bold text-[#888888]">
            Ricardo Martins | RTI Soluctions - CNPJ: 54.953.984/0001-54
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};  
