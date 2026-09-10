import React from "react";
import { StyleSheet, View } from "react-native";

export const Divisor = () => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.line} />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 16,
    backgroundColor: "#111827",
    marginLeft: -16,
    marginTop: 8,
    width: "100%"
  },
  line: {
    height: 1,
    backgroundColor: "#4b5563",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    maxWidth: 1536
  }
});
