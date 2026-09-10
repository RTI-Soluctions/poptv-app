import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divisor } from "./Divisor";

export const Footer = () => {

  return (
    <View style={styles.container}>
      <Divisor />
      <View style={styles.content}>
        <Text style={styles.copyright}>
          © Porto Alegre 24 horas.
        </Text>
        <Text style={styles.copyright}>
          Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  content: {
    height: 48,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingBottom: 12
  },
  copyright: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16
  }
});
