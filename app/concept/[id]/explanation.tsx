import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../../../src/data/concepts";
import PrimaryButton from "../../../src/components/PrimaryButton";
import MetaphorTable from "../../../src/components/MetaphorTable";
import { initDatabase, toggleFavorite, isFavorite } from "../../../src/lib/db";
import { getFieldColor } from "../../../src/utils/concept";
import { colors, typography, spacing, radius, shadows } from "../../../src/theme/tokens";

const SECTIONS = [
  { key: "plain", icon: "chatbubble-ellipses" as const, title: "大白话解释", color: colors.secondary },
  { key: "formal", icon: "book" as const, title: "正式定义", color: colors.tertiary },
  { key: "importance", icon: "star" as const, title: "为什么重要", color: colors.accent },
  { key: "metaphor", icon: "git-compare" as const, title: "隐喻对应表", color: colors.primary },
  { key: "boundary", icon: "warning" as const, title: "类比边界", color: colors.accent },
  { key: "example", icon: "document-text" as const, title: "现实例子", color: colors.success },
];

export default function ExplanationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const concept = concepts.find((c) => c.id === id);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    initDatabase();
    if (id) {
      setFav(isFavorite(id));
    }
  }, [id]);

  if (!concept) {
    return (
      <View style={styles.center}>
        <Text style={typography.body}>概念未找到</Text>
      </View>
    );
  }

  const fieldColor = getFieldColor(concept.field);

  const handleToggleFavorite = () => {
    const result = toggleFavorite(concept.id);
    setFav(result);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header card */}
      <View style={[styles.headerCard, { backgroundColor: fieldColor + "0D" }]}>
        <View style={styles.topBar}>
          <View style={[styles.badge, { backgroundColor: fieldColor }]}>
            <Text style={styles.badgeText}>{concept.field}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{concept.level}</Text>
          </View>
        </View>
        <Text style={[styles.conceptName, { color: fieldColor }]}>{concept.conceptName}</Text>
      </View>

      {/* Section: Plain explanation */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[0].color }]} />
        <View style={styles.sectionHeader}>
          <Ionicons name={SECTIONS[0].icon} size={18} color={SECTIONS[0].color} />
          <Text style={styles.sectionTitle}>{SECTIONS[0].title}</Text>
        </View>
        <Text style={styles.bodyText}>{concept.plainExplanation}</Text>
      </View>

      {/* Section: Formal definition */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[1].color }]} />
        <View style={styles.sectionHeader}>
          <Ionicons name={SECTIONS[1].icon} size={18} color={SECTIONS[1].color} />
          <Text style={styles.sectionTitle}>{SECTIONS[1].title}</Text>
        </View>
        <Text style={styles.bodyText}>{concept.formalDefinition}</Text>
      </View>

      {/* Section: Importance */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[2].color }]} />
        <View style={styles.sectionHeader}>
          <Ionicons name={SECTIONS[2].icon} size={18} color={SECTIONS[2].color} />
          <Text style={styles.sectionTitle}>{SECTIONS[2].title}</Text>
        </View>
        <Text style={styles.bodyText}>{concept.importance}</Text>
      </View>

      {/* Section: Metaphor table */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[3].color }]} />
        <View style={styles.sectionHeader}>
          <Ionicons name={SECTIONS[3].icon} size={18} color={SECTIONS[3].color} />
          <Text style={styles.sectionTitle}>{SECTIONS[3].title}</Text>
        </View>
        <MetaphorTable data={concept.metaphorMap} />
      </View>

      {/* Section: Boundaries */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[4].color }]} />
        <View style={styles.sectionHeader}>
          <Ionicons name={SECTIONS[4].icon} size={18} color={SECTIONS[4].color} />
          <Text style={styles.sectionTitle}>{SECTIONS[4].title}</Text>
        </View>
        {concept.boundaries.map((b, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{b}</Text>
          </View>
        ))}
      </View>

      {/* Section: Examples */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[5].color }]} />
        <View style={styles.sectionHeader}>
          <Ionicons name={SECTIONS[5].icon} size={18} color={SECTIONS[5].color} />
          <Text style={styles.sectionTitle}>{SECTIONS[5].title}</Text>
        </View>
        {concept.examples.map((ex, i) => (
          <View key={i} style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <Text style={styles.exampleTitle}>{ex.title}</Text>
              <View
                style={[
                  styles.exampleTag,
                  ex.type === "positive" ? styles.positiveTag : styles.negativeTag,
                ]}
              >
                <Text
                  style={[
                    styles.exampleTagText,
                    ex.type === "positive" ? styles.positiveText : styles.negativeText,
                  ]}
                >
                  {ex.type === "positive" ? "正面" : "反面"}
                </Text>
              </View>
            </View>
            <Text style={styles.exampleContent}>{ex.content}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <PrimaryButton
          title={fav ? "已收藏" : "收藏此概念"}
          variant={fav ? "secondary" : "outline"}
          onPress={handleToggleFavorite}
          icon={fav ? "heart" : "heart-outline"}
        />
        <PrimaryButton
          title="开始测试"
          onPress={() => router.push(`/concept/${id}/quiz`)}
          icon="arrow-forward"
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
    padding: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  // Header card
  headerCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.base,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.xs,
    marginRight: spacing.sm,
  },
  badgeText: {
    ...typography.labelMedium,
    color: colors.onPrimary,
  },
  levelBadge: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.xs,
  },
  levelText: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
  },
  conceptName: {
    ...typography.displaySmall,
  },

  // Section cards
  sectionCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.base + 2,
    marginBottom: spacing.sm + 2,
    ...shadows.md,
    overflow: "hidden",
  },
  sectionAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
  },
  bodyText: {
    ...typography.body,
    color: colors.onSurface,
  },

  // Bullets
  bulletRow: {
    flexDirection: "row",
    marginBottom: spacing.sm + 2,
    paddingLeft: spacing.xs,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.sm + 2,
  },
  bulletText: {
    flex: 1,
    ...typography.body,
    color: colors.onSurface,
  },

  // Examples
  exampleCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
  },
  exampleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  exampleTitle: {
    ...typography.titleSmall,
    color: colors.onSurface,
  },
  exampleTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
  },
  positiveTag: { backgroundColor: colors.successContainer },
  negativeTag: { backgroundColor: colors.errorContainer },
  exampleTagText: { ...typography.labelSmall },
  positiveText: { color: colors.success },
  negativeText: { color: colors.error },
  exampleContent: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },

  // Actions
  actions: { marginTop: spacing.sm, gap: spacing.sm },
});
