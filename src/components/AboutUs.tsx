import React from "react";
import { StyleSheet, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divisor } from "./Divisor";
import { useAppContext } from "../context/AppContext";
import { PolicyModal } from "./PolicyModal";

export const AboutUs = () => {
  const { isModalOpen, setIsModalOpen } = useAppContext();

  return (
    <ScrollView style={styles.container}>
      {isModalOpen && <PolicyModal />}
      {!isModalOpen && (
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.title}>Sobre Nós</Text>
            <Divisor />
            <Text style={styles.paragraph}>
              A Porto Alegre 24h TV é uma emissora de televisão aberta que atua na Região Metropolitana de Porto Alegre, em Bento Gonçalves e na Serra Gaúcha pelo canal 8.1 e também em Sobradinho-RS pelo canal 45.1.
            </Text>
            <Text style={styles.paragraph}>
              Com o propósito de informar, entreter e enriquecer a cultura da
              comunidade, a Porto Alegre 24h TV apresenta uma programação diversificada,
              abrangendo jornalismo, entretenimento, cultura e lazer.
              Comprometida com a excelência, buscamos constantemente inovar e
              oferecer conteúdo de qualidade para nossos telespectadores.
            </Text>
            <Text style={styles.paragraph}>
              A Porto Alegre 24h TV valoriza a privacidade e a proteção dos dados pessoais de
              seus usuários. Em conformidade com a Lei Geral de Proteção de
              Dados (LGPD), adotamos medidas rigorosas para garantir a segurança
              de suas informações. Para mais detalhes clique em Saiba Mais.
            </Text>
            <Divisor />
          </View>

          <Text style={styles.contact}>
            Para saber mais sobre a programação da Porto Alegre 24h TV,
            novidades e interagir conosco, acesse nosso site www.poa24horas.com.br
            ou entre em contato pelo email{" "}
            <Text
              style={styles.email}
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
            <Text style={styles.policyLink}>
              Políticas de uso e de privacidade.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    width: "100%",
    paddingBottom: 80
  },
  content: {
    flexDirection: "column",
    marginTop: 32,
    marginBottom: 80,
    padding: 8
  },
  section: {
    flexDirection: "column",
    backgroundColor: "#000000",
    padding: 16,
    margin: 16,
    marginTop: -16
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: "#ffffff"
  },
  paragraph: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 20,
    color: "#ffffff",
    paddingTop: 16
  },
  contact: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 20,
    color: "#ffffff",
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 32,
    marginRight: 32
  },
  email: {
    color: "#1bafff",
    textDecorationLine: "underline"
  },
  policyLink: {
    color: "#1bafff",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 32,
    marginTop: -16
  }
});
