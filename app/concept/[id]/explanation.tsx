import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../../../src/data/concepts";
import PrimaryButton from "../../../src/components/PrimaryButton";
import MetaphorTable from "../../../src/components/MetaphorTable";
import { initDatabase, toggleFavorite, isFavorite } from "../../../src/lib/db";
import { getFieldColor } from "../../../src/utils/concept";
import { colors, typography, spacing, radius, shadows } from "../../../src/theme/tokens";

const isWeb = Platform.OS === "web";

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
    if (!isWeb) {
      initDatabase();
      if (id) {
        setFav(isFavorite(id));
      }
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
    if (!isWeb) {
      const result = toggleFavorite(concept.id);
      setFav(result);
    }
  };

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
            <Text style={styles.breadcrumbCurrent}>{concept.conceptName}</Text>
          </View>
        )}

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

        {/* Sections */}
        <View style={styles.sectionsContainer}>
          {/* Section: Plain explanation */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[0].color }]} />
            <View style={styles.sectionHeader}>
              <Ionicons name={SECTIONS[0].icon} size={20} color={SECTIONS[0].color} />
              <Text style={styles.sectionTitle}>{SECTIONS[0].title}</Text>
            </View>
            <Text style={styles.bodyText}>{concept.plainExplanation}</Text>
          </View>

          {/* Section: Formal definition */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[1].color }]} />
            <View style={styles.sectionHeader}>
              <Ionicons name={SECTIONS[1].icon} size={20} color={SECTIONS[1].color} />
              <Text style={styles.sectionTitle}>{SECTIONS[1].title}</Text>
            </View>
            <Text style={styles.bodyText}>{concept.formalDefinition}</Text>
          </View>

          {/* Section: Importance */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[2].color }]} />
            <View style={styles.sectionHeader}>
              <Ionicons name={SECTIONS[2].icon} size={20} color={SECTIONS[2].color} />
              <Text style={styles.sectionTitle}>{SECTIONS[2].title}</Text>
            </View>
            <Text style={styles.bodyText}>{concept.importance}</Text>
          </View>

          {/* Section: Metaphor table */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[3].color }]} />
            <View style={styles.sectionHeader}>
              <Ionicons name={SECTIONS[3].icon} size={20} color={SECTIONS[3].color} />
              <Text style={styles.sectionTitle}>{SECTIONS[3].title}</Text>
            </View>
            <MetaphorTable data={concept.metaphorMap} />
          </View>

          {/* Section: Boundaries */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionAccent, { backgroundColor: SECTIONS[4].color }]} />
            <View style={styles.sectionHeader}>
              <Ionicons name={SECTIONS[4].icon} size={20} color={SECTIONS[4].color} />
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
              <Ionicons name={SECTIONS[5].icon} size={20} color={SECTIONS[5].color} />
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
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {!isWeb && (
            <PrimaryButton
              title={fav ? "已收藏" : "收藏此概念"}
              variant={fav ? "secondary" : "outline"}
              onPress={handleToggleFavorite}
              icon={fav ? "heart" : "heart-outline"}
            />
          )}
          <PrimaryButton
            title="开始测试"
            onPress={() => router.push(`/concept/${id}/quiz`)}
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

  // Header card
  headerCard: {
    borderRadius: radius.xl,
    padding: isWeb ? spacing.xl * 1.5 : spacing.lg,
    marginBottom: spacing.xl,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    marginRight: spacing.md,
  },
  badgeText: {
    ...typography.labelMedium,
    color: colors.onPrimary,
  },
  levelBadge: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  levelText: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
  },
  conceptName: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: "700",
    lineHeight: isWeb ? 48 : 36,
  },

  // Sections
  sectionsContainer: {
    gap: spacing.lg,
  },
  sectionCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: isWeb ? spacing.xl : spacing.base + 2,
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
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.titleLarge,
    color: colors.onSurface,
  },
  bodyText: {
    ...typography.bodyLarge,
    color: colors.onSurface,
    lineHeight: 32,
  },

  // Bullets
  bulletRow: {
    flexDirection: "row",
    marginBottom: spacing.md,
    paddingLeft: spacing.sm,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    marginTop: 10,
    marginRight: spacing.md,
  },
  bulletText: {
    flex: 1,
    ...typography.body,
    color: colors.onSurface,
    lineHeight: 28,
  },

  // Examples
  exampleCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  exampleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  exampleTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
  },
  exampleTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  positiveTag: { backgroundColor: colors.successContainer },
  negativeTag: { backgroundColor: colors.errorContainer },
  exampleTagText: { ...typography.labelMedium },
  positiveText: { color: colors.success },
  negativeText: { color: colors.error },
  exampleContent: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
  },

  // Actions
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
    alignItems: isWeb ? "center" : "stretch",
  },
});
