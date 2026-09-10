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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            setIsModalOpen(false);
          }}
          style={styles.closeButton}
        >
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Política de Privacidade e Proteção de Dados - Porto Alegre 24h TV
        </Text>

        <Text style={styles.paragraph}>
          Na Porto Alegre 24h TV, estamos comprometidos com a proteção da privacidade e dos
          dados pessoais dos nossos usuários. Esta política foi elaborada de
          acordo com as <Text style={styles.bold}>Diretrizes de Privacidade</Text>, além da Lei Geral de Proteção de Dados (LGPD), e tem como objetivo esclarecer como lidamos com as informações do aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>
          1. Coleta de Dados Pessoais
        </Text>
        <Text style={styles.paragraph}>
          O aplicativo Porto Alegre 24h TV valoriza a sua privacidade e, por princípio,{" "}
          <Text style={styles.bold}>não coleta, armazena ou transmite seus dados pessoais diretamente</Text>.
          Não solicitamos informações como nome, endereço, telefone, e-mail, senhas ou qualquer outro dado sensível que possa
          identificar o usuário. O aplicativo não requer a criação de conta ou login para seu funcionamento.
        </Text>

        <Text style={styles.sectionTitle}>
          2. Bibliotecas de Terceiros e Telemetria
        </Text>
        <Text style={styles.paragraph}>
          Para garantir o bom funcionamento e aprimorar a estabilidade do aplicativo, utilizamos bibliotecas de terceiros necessárias para sua construção.
          É possível que essas tecnologias coletem dados automáticos de <Text style={styles.bold}>telemetria de forma anonimizada</Text>, tais como:
          {"\n"}• Informações de falhas e erros de software (crash logs);
          {"\n"}• Estatísticas básicas de desempenho do aplicativo;
          {"\n"}• Informações genéricas sobre o dispositivo e sistema operacional.
          {"\n\n"}
          Essas informações não são associadas à sua identidade e servem estritamente para que nossos desenvolvedores possam corrigir bugs e melhorar a sua experiência de uso, respeitando integralmente as políticas da plataforma.
        </Text>

        <Text style={styles.sectionTitle}>
          3. Compartilhamento de Dados
        </Text>
        <Text style={styles.paragraph}>
          Como nossa aplicação não coleta seus dados pessoais, elaboramos esta aba para deixar claro que <Text style={styles.bold}>nenhuma informação sua é compartilhada, vendida ou repassada a terceiros</Text> para fins de publicidade direcionada, marketing ou comercialização.
        </Text>

        <Text style={styles.sectionTitle}>
          4. Segurança da Informação
        </Text>
        <Text style={styles.paragraph}>
          O conteúdo fornecido pelo nosso aplicativo (transmissões de vídeo e grade de programação) é entregue através de conexões de rede seguras. Quaisquer dados de diagnóstico e telemetria coletados pelas bibliotecas de base respeitam os protocolos rigorosos de criptografia exigidos.
        </Text>

        <Text style={styles.sectionTitle}>
          5. Alterações na Política de Privacidade
        </Text>
        <Text style={styles.paragraph}>
          Esta política poderá ser atualizada periodicamente para assegurar a
          conformidade com novas leis, regulamentos ou mudanças técnicas no nosso próprio aplicativo.
          Recomendamos que você revise esse documento esporadicamente ao atualizar o app.
        </Text>

        <Text style={styles.sectionTitle}>
          6. Contato
        </Text>
        <Text style={styles.contactParagraph}>
          Caso você tenha dúvidas sobre esta política de não coleta, sobre a telemetria utilizada ou queira nos contatar para
          mais informações, fale com nossa equipe de suporte pelo e-mail:
          <Text
            style={styles.email}
            onPress={() => Linking.openURL("mailto:contato@poa24horas.com.br")}
          >
            {" "}contato@poa24horas.com.br
          </Text>
          .
        </Text>

        <Divisor />

        <Text style={styles.company}>
          A Porto Alegre 24h - CNPJ: 35.133.051/0001-76
        </Text>
        <Text style={styles.updatedAt}>
          Última atualização: 16 de março de 2026.
        </Text>

        <View style={styles.credits}>
          <Text style={styles.creditsLabel}>
            Desenvolvido e publicado por
          </Text>
          <Text style={styles.creditsCompany}>
            Ricardo Martins | RTI Soluctions - CNPJ: 54.953.984/0001-54
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};  

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 64
  },
  content: {
    flexDirection: "column",
    backgroundColor: "#000000",
    padding: 16,
    margin: 16
  },
  closeButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8
  },
  closeIcon: {
    width: 20,
    height: 20
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 20
  },
  paragraph: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 20,
    color: "#ffffff",
    paddingTop: 16
  },
  bold: {
    fontWeight: "700"
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 20
  },
  contactParagraph: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 20,
    color: "#ffffff",
    paddingTop: 16,
    marginBottom: 32
  },
  email: {
    color: "#1bafff",
    fontWeight: "700"
  },
  company: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#888888",
    marginTop: 32
  },
  updatedAt: {
    textAlign: "justify",
    fontSize: 12,
    lineHeight: 16,
    color: "#888888",
    paddingTop: 4,
    marginBottom: 24
  },
  credits: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: "#333333",
    paddingTop: 16
  },
  creditsLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: "#666666"
  },
  creditsCompany: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    color: "#888888"
  }
});
