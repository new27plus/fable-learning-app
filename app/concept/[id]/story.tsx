import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../../../src/data/concepts";
import PrimaryButton from "../../../src/components/PrimaryButton";
import { colors, typography, spacing, radius, shadows } from "../../../src/theme/tokens";
import { getFieldColor } from "../../../src/utils/concept";

const isWeb = Platform.OS === "web";

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
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Breadcrumb */}
        {isWeb && (
          <View style={styles.breadcrumb}>
            <Text style={styles.breadcrumbLink} onPress={() => router.push("/")}>首页</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.onSurfaceVariant} />
            <Text style={styles.breadcrumbLink} onPress={() => router.push(`/fields/${concept.field}`)}>{concept.field}</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.onSurfaceVariant} />
            <Text style={styles.breadcrumbCurrent}>{concept.storyTitle}</Text>
          </View>
        )}

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
        <View style={styles.fableContainer}>
          <Text style={styles.fable}>{concept.fable}</Text>
        </View>

        {/* Reveal section */}
        <View style={styles.revealSection}>
          <View style={styles.revealDivider} />
          <Ionicons name="bulb-outline" size={32} color={colors.accent} style={styles.revealIcon} />
          <Text style={styles.hint}>准备好了解这个概念了吗？</Text>
          <PrimaryButton
            title="揭示概念"
            onPress={() => router.push(`/concept/${id}/explanation`)}
            icon="arrow-forward"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  breadcrumbLink: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  breadcrumbCurrent: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },

  // Header
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  fieldBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    marginRight: spacing.md,
  },
  fieldText: {
    ...typography.labelMedium,
    color: colors.onPrimary,
  },
  levelBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  levelText: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
  },
  storyTitle: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: spacing.lg,
    lineHeight: isWeb ? 48 : 36,
  },
  divider: {
    height: 3,
    backgroundColor: colors.primary,
    width: 48,
    marginBottom: spacing.xl,
    borderRadius: 2,
  },

  // Fable
  fableContainer: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.xl,
    padding: isWeb ? spacing.xl * 1.5 : spacing.lg,
    ...shadows.md,
  },
  fable: {
    ...typography.bodyLarge,
    color: colors.onSurface,
    textAlign: "justify",
    lineHeight: 32,
  },

  // Reveal
  revealSection: {
    marginTop: spacing.xxxl * 2,
    alignItems: "center",
    paddingTop: spacing.xl,
  },
  revealDivider: {
    width: 64,
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginBottom: spacing.xl,
  },
  revealIcon: {
    marginBottom: spacing.md,
  },
  hint: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xl,
  },
});
