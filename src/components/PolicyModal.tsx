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
      <View className="flex-col bg-gray-900 p-4 m-4">
        <TouchableOpacity
          onPress={() => {
            setIsModalOpen(false);
            console.log("Clicou para fechar o modal.");
          }}
          className="w-full flex-row justify-end p-2"
        >
          <Image source={CloseIcon} className="w-5 h-5" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-white mt-5">
          Política de Privacidade e Proteção de Dados do Usuário - Pop TV
        </Text>

        <Text className="text-justify text-sm text-white pt-4">
          Na Pop TV, estamos comprometidos com a proteção da privacidade e dos
          dados pessoais dos nossos usuários. Esta política foi elaborada de
          acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº
          13.709/2018) e tem como objetivo esclarecer como lidamos com
          informações pessoais.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          1. Coleta de Dados Pessoais
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          A Pop TV valoriza a privacidade de seus usuários e, por isso,{" "}
          <Text className="font-bold">não coleta quaisquer dados pessoais</Text>{" "}
          sem o consentimento expresso e informado. Não solicitamos informações
          como nome, endereço, telefone, e-mail ou qualquer outro dado que possa
          identificar o usuário.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          2. Utilização de Dados
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Como não coletamos dados pessoais dos nossos usuários, também não
          utilizamos ou processamos informações para fins de marketing,
          análises, ou personalização de serviços. Qualquer navegação ou
          interação com nossos serviços online é feita de forma{" "}
          <Text className="font-bold">anônima</Text>.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          3. Cookies e Tecnologias de Rastreamento
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          A Pop TV adota uma política de{" "}
          <Text className="font-bold">não utilização de cookies</Text> ou outras
          tecnologias de rastreamento que possam identificar ou monitorar o
          comportamento do usuário. Quaisquer cookies necessários para a
          operação do site são puramente técnicos, visando apenas a otimização
          do funcionamento da plataforma.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          4. Compartilhamento de Dados
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Como não coletamos dados pessoais, não compartilhamos informações com
          terceiros. Em situações excepcionais, se houver a necessidade de
          coleta de dados por parte de serviços de terceiros, o usuário será
          previamente informado e o consentimento será solicitado.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          5. Direitos dos Usuários
        </Text>
        <Text className="text-justify text-sm text-white pt-4 mb-4">
          De acordo com a LGPD, os usuários têm o direito de:
        </Text>
        <Text className="list-item  text-white mb-2">
          • Saber se seus dados estão sendo coletados;
        </Text>
        <Text className="list-item  text-white mb-2">
          • Solicitar a exclusão de quaisquer dados que possam, eventualmente,
          ser coletados com consentimento;
        </Text>
        <Text className="list-item  text-white">
          • Retirar o consentimento a qualquer momento.
        </Text>

        <Text className="text-justify text-sm text-white pt-4">
          No entanto, como nossa política é de{" "}
          <Text className="font-bold">não coleta de dados pessoais</Text>, tais
          solicitações geralmente não serão aplicáveis no contexto da Pop TV.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          6. Segurança da Informação
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Embora não coletemos dados pessoais, implementamos práticas rigorosas
          de segurança para garantir a proteção de quaisquer informações
          técnicas coletadas, como dados de desempenho e acesso técnico ao site,
          que são utilizados apenas para garantir a estabilidade da nossa
          plataforma.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          7. Alterações na Política de Privacidade
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Esta política pode ser alterada de tempos em tempos para garantir a
          conformidade com a legislação e para refletir mudanças nos nossos
          processos. Qualquer alteração significativa será devidamente
          comunicada aos nossos usuários.
        </Text>

        <Text className="text-lg font-semibold text-white mt-5">
          8. Contato
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Caso o usuário tenha dúvidas sobre esta política ou queira obter mais
          informações, entre em contato com nossa equipe de suporte:
          <Text
            className="list-items text-[#1bafff] underline"
            onPress={() => Linking.openURL("mailto:suporte@poptv.com.br")}
          >
            {" "}
            suporte@poptv.com.br
          </Text>
          .
        </Text>

        <Divisor />

        <Text className="text-2xl font-semibold text-white mt-5">
          Política de Não Coleta de Dados do Usuário
        </Text>
        <Text className="text-justify text-sm text-white pt-4 mb-5">
          A Pop TV adota uma política clara e transparente de{" "}
          <Text className="font-bold mb-4">não coleta de dados pessoais</Text>{" "}
          de seus usuários. Isso significa que:
        </Text>
        <Text className="list-item text-white mb-2">
          • Não realizamos a coleta de informações de identificação pessoal;
        </Text>
        <Text className="list-item text-white mb-2">
          • Não monitoramos ou registramos o comportamento dos usuários em nossa
          plataforma;
        </Text>
        <Text className="list-item text-white">
          • Não utilizamos cookies ou outras tecnologias para coleta de dados
          comportamentais.
        </Text>

        <Text className="text-justify text-sm text-white pt-4">
          Nosso compromisso é garantir que nossos serviços sejam acessíveis de
          forma anônima e respeitem a privacidade total dos nossos usuários.
          Essa postura é parte do nosso esforço contínuo para estar em
          conformidade com a LGPD e respeitar o direito à privacidade.
        </Text>

        <Text className="text-base font-semibold text-white">
          Pop TV – MMA Comunicações Ltda - CNPJ: 11.706.300/0001-07
        </Text>
        <Text className="text-justify text-sm text-white pt-4">
          Última atualização: 09 de outubro de 2024.
        </Text>
      </View>
    </ScrollView>
  );
};
