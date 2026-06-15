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
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: fieldColor }]}>
          <Text style={styles.badgeText}>{concept.field}</Text>
        </View>
        <View style={[styles.levelBadge, { borderColor: fieldColor }]}>
          <Text style={[styles.levelText, { color: fieldColor }]}>{concept.level}</Text>
        </View>
      </View>
      <Text style={styles.title}>{concept.storyTitle}</Text>
      <View style={styles.footer}>
        <View style={styles.statusRow}>
          {isLearned && <Text style={styles.statusTag}>✅ 已学习</Text>}
          {isFavorite && <Text style={styles.statusTag}>❤️ 已收藏</Text>}
        </View>
        <Text style={styles.hint}>点击阅读 →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
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
    borderRadius: 6,
    borderWidth: 1,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 8,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    gap: 8,
  },
  statusTag: {
    fontSize: 12,
    color: "#636E72",
  },
  hint: {
    fontSize: 12,
    color: "#B2BEC3",
  },
});
