import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../../src/data/concepts";
import PrimaryButton from "../../../src/components/PrimaryButton";
import { colors, typography, spacing, radius } from "../../../src/theme/tokens";
import { getFieldColor } from "../../../src/utils/concept";

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    return (
      <View style={styles.center}>
        <Text style={typography.body}>概念未找到</Text>
      </View>
    );
  }

  const fieldColor = getFieldColor(concept.field);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header badges */}
      <View style={styles.storyHeader}>
        <View style={[styles.fieldBadge, { backgroundColor: fieldColor }]}>
          <Text style={styles.fieldText}>{concept.field}</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{concept.level}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.storyTitle}>{concept.storyTitle}</Text>

      <View style={styles.divider} />

      {/* Fable body */}
      <Text style={styles.fable}>{concept.fable}</Text>

      {/* Reveal section */}
      <View style={styles.revealSection}>
        <View style={styles.revealDivider} />
        <Text style={styles.hint}>准备好了解这个概念了吗？</Text>
        <PrimaryButton
          title="揭示概念"
          onPress={() => router.push(`/concept/${id}/explanation`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.base,
  },
  fieldBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.xs,
    marginRight: spacing.sm,
  },
  fieldText: {
    ...typography.labelMedium,
    color: colors.onPrimary,
  },
  levelBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.xs,
  },
  levelText: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
  },
  storyTitle: {
    ...typography.displaySmall,
    color: colors.onSurface,
    marginBottom: spacing.base,
  },
  divider: {
    height: 3,
    backgroundColor: colors.primary,
    width: 36,
    marginBottom: spacing.xl,
    borderRadius: 2,
  },
  fable: {
    ...typography.bodyLarge,
    color: colors.onSurface,
    textAlign: "justify",
  },
  revealSection: {
    marginTop: spacing.xxxl,
    alignItems: "center",
    paddingTop: spacing.xl,
  },
  revealDivider: {
    width: 48,
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  hint: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.base,
  },
});
