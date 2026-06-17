import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedCard from "./AnimatedCard";
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

function ConceptCard({ concept, isLearned, isFavorite, onPress }: Props) {
  const fieldColor = getFieldColor(concept.field);

  return (
    <AnimatedCard onPress={onPress} style={styles.card}>
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
            {isLearned && (
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            )}
            {isFavorite && (
              <Ionicons name="heart" size={14} color={colors.error} />
            )}
          </View>
        </View>
        <Text style={styles.title}>{concept.storyTitle}</Text>
        <View style={styles.footer}>
          <Text style={styles.hint}>点击阅读</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.onSurfaceVariant} />
        </View>
      </View>
    </AnimatedCard>
  );
}

export default memo(ConceptCard);

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
    gap: 6,
    alignItems: "center",
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
    gap: spacing.xs,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },
});
