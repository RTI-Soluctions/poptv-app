import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onDismiss: () => void;
};

export const ExitModal = ({ visible, onClose, onMinimize, onDismiss }: Props) => (
  <Modal transparent visible={visible} animationType="none" onRequestClose={onDismiss}>
    <View style={styles.overlay}>
      <View style={styles.card} accessibilityViewIsModal>
        <Text style={styles.title} accessibilityRole="header">Deseja sair do aplicativo?</Text>
        <Text style={styles.description}>
          Toque em Não para continuar assistindo em uma janela flutuante, ou em Sim para encerrar a reprodução e sair.
        </Text>
        <View style={styles.buttons}>
          <Pressable accessibilityRole="button" accessibilityLabel="Não, assistir em janela flutuante" onPress={onMinimize} style={styles.minimize}>
            <Text style={styles.buttonText}>Não</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Sim, sair do aplicativo" onPress={onClose} style={styles.close}>
            <Text style={styles.buttonText}>Sim</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.75)", justifyContent: "center", alignItems: "center", padding: 24 },
  card: { width: "100%", maxWidth: 300, padding: 18, borderRadius: 14, backgroundColor: "#1c1c1e" },
  title: { color: "#ffffff", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  description: { color: "#d1d5db", fontSize: 14, lineHeight: 20, marginBottom: 16 },
  buttons: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  minimize: { minWidth: 64, minHeight: 36, paddingHorizontal: 16, borderRadius: 8, backgroundColor: "#167bb5", alignItems: "center", justifyContent: "center" },
  close: { minWidth: 64, minHeight: 36, paddingHorizontal: 16, borderRadius: 8, backgroundColor: "#48484a", alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#ffffff", fontSize: 14, fontWeight: "700" },
});
