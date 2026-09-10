import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Epg, Epgs } from "../database/epg_db";
import { useAppContext } from "../context/AppContext";

const checkCurrentProgram = () => {

  const now = new Date();
  const currentTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");
  const currentDay = now.getUTCDay();

  return Epgs.find((program) => {
    return (
      program.days.includes(currentDay) &&
      currentTime >= program.start &&
      currentTime <= program.end
    );
  });
};

export const Now = () => {
  const [program, setProgram] = useState({} as Epg);

  const { dayList } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgram = checkCurrentProgram();
      if (currentProgram) {
        setProgram(currentProgram);
      } else {
        setProgram({
          start: `${new Date().getHours()}:00`,
          end: `${new Date().getHours() + 1}:00`,
          days: [0],
          name: "Programação Pop TV",
          description: "Sem informações",
        } as Epg);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {program && (
        <>
          <Text style={styles.title}>
            {program.name}
          </Text>
          <Text style={styles.schedule}>
            {program.start} - {program.end}
          </Text>
          {/* <Text style={styles.description}>
            {program.description}
          </Text> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingTop: 16,
    width: "100%"
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    width: "90%",
    color: "#f9fafb"
  },
  schedule: {
    textAlign: "left",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "300",
    width: "90%",
    color: "#d1d5db"
  },
  description: {
    textAlign: "justify",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "400",
    width: "90%",
    marginTop: 8,
    color: "#d1d5db"
  }
});
