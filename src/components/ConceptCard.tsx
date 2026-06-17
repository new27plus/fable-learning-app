import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getFieldColor } from "../utils/concept";
import { colors, typography, spacing, radius, shadows } from "../theme/tokens";

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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.accent, { backgroundColor: fieldColor }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: fieldColor }]}>
            <Text style={styles.badgeText}>{concept.field}</Text>
          </View>
          <View style={[styles.levelBadge, { borderColor: fieldColor + "40" }]}>
            <Text style={[styles.levelText, { color: fieldColor }]}>{concept.level}</Text>
          </View>
          <View style={styles.statusDots}>
            {isLearned && <View style={[styles.dot, { backgroundColor: colors.success }]} />}
            {isFavorite && <View style={[styles.dot, { backgroundColor: colors.error }]} />}
          </View>
        </View>
        <Text style={styles.title}>{concept.storyTitle}</Text>
        <View style={styles.footer}>
          <Text style={styles.hint}>点击阅读</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
    overflow: "hidden",
  },
  accent: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
    marginRight: spacing.sm,
  },
  badgeText: {
    ...typography.labelSmall,
    color: colors.onPrimary,
  },
  levelBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
    borderWidth: 1,
  },
  levelText: {
    ...typography.labelSmall,
  },
  statusDots: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
  },
  title: {
    ...typography.titleMedium,
    color: colors.onSurface,
    marginBottom: spacing.sm + 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  hint: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginRight: spacing.xs,
  },
  arrow: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
});
