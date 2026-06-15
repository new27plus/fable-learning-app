import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getFieldColor } from "../utils/concept";

interface Props {
  concept: {
    id: string;
    field: string;
    level: string;
    storyTitle: string;
  };
  isLearned: boolean;
  isFavorite: boolean;
  onPress: () => void;
}

export default function ConceptCard({ concept, isLearned, isFavorite, onPress }: Props) {
  const fieldColor = getFieldColor(concept.field);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.accent, { backgroundColor: fieldColor }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: fieldColor }]}>
            <Text style={styles.badgeText}>{concept.field}</Text>
          </View>
          <View style={[styles.levelBadge, { borderColor: fieldColor + "60" }]}>
            <Text style={[styles.levelText, { color: fieldColor }]}>{concept.level}</Text>
          </View>
          <View style={styles.statusDots}>
            {isLearned && <View style={[styles.dot, { backgroundColor: "#00B894" }]} />}
            {isFavorite && <View style={[styles.dot, { backgroundColor: "#E17055" }]} />}
          </View>
        </View>
        <Text style={styles.title}>{concept.storyTitle}</Text>
        <View style={styles.footer}>
          <Text style={styles.hint}>点击阅读</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  accent: {
    width: 5,
  },
  body: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusDots: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 10,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  hint: {
    fontSize: 12,
    color: "#B2BEC3",
    marginRight: 4,
  },
  arrow: {
    fontSize: 18,
    color: "#B2BEC3",
    fontWeight: "300",
  },
});
