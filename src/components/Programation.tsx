import React from "react";
import { StyleSheet,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Programs } from "../database/programs_db";
import { Footer } from "./Footer";

const daysMap: Record<number, string> = {
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
  7: "Dom",
};

const getDayLabel = (num: number) => daysMap[num] || "";

export const Programation = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {Programs.map((program, index) => (
          <View
            key={index}
            style={styles.card}
          >
            {/* Imagem do Programa */}
            <View style={styles.imageContainer}>
              <Image
                source={program.image as ImageSourcePropType}
                style={styles.image}
              />
            </View>

            {/* Conteúdo do Card */}
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text
                  style={styles.title}
                  numberOfLines={2}
                >
                  {program.name}
                </Text>

                {/* Horário (Badge de cor de destaque) */}
                <View style={styles.timeBadge}>
                  <Text style={styles.timeLabel}>
                    {program.start} - {program.end}
                  </Text>
                </View>
              </View>

              {/* Dias da Semana (Pills) */}
              <View style={styles.days}>
                {program.days.map((day, idx) => (
                  <View
                    key={idx}
                    style={styles.dayBadge}
                  >
                    <Text style={styles.dayLabel}>
                      {getDayLabel(day)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    width: "100%"
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 24,
    marginBottom: 64,
    width: "100%"
  },
  card: {
    marginBottom: 32,
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  imageContainer: {
    width: "100%",
    height: 192,
    backgroundColor: "#2a2a2d"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  cardContent: {
    padding: 20
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 28,
    color: "#ffffff",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    marginRight: 16,
    letterSpacing: 0.5
  },
  timeBadge: {
    backgroundColor: "rgba(27, 175, 255, 0.2)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(27, 175, 255, 0.3)"
  },
  timeLabel: {
    color: "#1bafff",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 20
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  dayBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8
  },
  dayLabel: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    color: "#d1d5db",
    textTransform: "uppercase",
    letterSpacing: 1.2000000000000002
  }
});
