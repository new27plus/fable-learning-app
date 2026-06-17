import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../src/data/concepts";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../src/utils/concept";
import { initDatabase, getLearningRecords } from "../src/lib/db";
import { colors, typography, spacing, radius, shadows } from "../src/theme/tokens";
import type { Field } from "../src/types/concept";

const NAV_ITEMS = [
  { icon: "heart" as const, label: "我的收藏", route: "/favorites", color: colors.error },
  { icon: "stats-chart" as const, label: "学习记录", route: "/records", color: colors.info },
  { icon: "document-text" as const, label: "错题本", route: "/wrong-answers", color: colors.tertiary },
  { icon: "settings-sharp" as const, label: "设置", route: "/settings", color: colors.onSurfaceVariant },
];

export default function HomeScreen() {
  const router = useRouter();
  const [todayConcept, setTodayConcept] = useState(concepts[0]);
  const [lastConceptId, setLastConceptId] = useState<string | null>(null);

  useEffect(() => {
    initDatabase();
    const dayIndex = new Date().getDate() % concepts.length;
    setTodayConcept(concepts[dayIndex]);
    const records = getLearningRecords();
    if (records.length > 0) {
      setLastConceptId(records[0].concept_id);
    }
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.appName}>寓言学堂</Text>
        <Text style={styles.tagline}>用故事理解复杂概念</Text>
      </View>

      {/* Today's recommendation */}
      <TouchableOpacity
        style={styles.todayCard}
        onPress={() => router.push(`/concept/${todayConcept.id}/story`)}
        activeOpacity={0.9}
      >
        <View style={styles.todayTop}>
          <View style={styles.todayIconWrap}>
            <Text style={styles.todayIcon}>{FIELD_ICONS[todayConcept.field as Field]}</Text>
          </View>
          <View style={styles.todayMeta}>
            <View style={styles.todayFieldBadge}>
              <Text style={styles.todayFieldText}>{todayConcept.field}</Text>
            </View>
            <Text style={styles.todayLevel}>{todayConcept.level}</Text>
          </View>
        </View>
        <Text style={styles.todayLabel}>今日推荐</Text>
        <Text style={styles.todayTitle}>{todayConcept.storyTitle}</Text>
        <View style={styles.todayFooter}>
          <Text style={styles.todayAction}>开始阅读</Text>
          <Ionicons name="arrow-forward" size={16} color="rgba(255,255,255,0.7)" />
        </View>
      </TouchableOpacity>

      {/* Continue learning */}
      {lastConceptId && (
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => router.push(`/concept/${lastConceptId}/story`)}
          activeOpacity={0.8}
        >
          <View style={styles.continueDot} />
          <View style={styles.continueInfo}>
            <Text style={styles.continueLabel}>继续学习</Text>
            <Text style={styles.continueHint}>上次学到的概念</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      )}

      {/* Fields */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学科探索</Text>
        <View style={styles.fieldGrid}>
          {FIELDS.map((field) => {
            const color = FIELD_COLORS[field];
            return (
              <TouchableOpacity
                key={field}
                style={styles.fieldCard}
                onPress={() => router.push(`/fields/${field}`)}
                activeOpacity={0.8}
              >
                <View style={[styles.fieldIconBg, { backgroundColor: color + "14" }]}>
                  <Text style={styles.fieldIcon}>{FIELD_ICONS[field]}</Text>
                </View>
                <Text style={[styles.fieldName, { color }]}>{field}</Text>
                <Text style={styles.fieldCount}>
                  {concepts.filter((c) => c.field === field).length} 个概念
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>我的学习</Text>
        <View style={styles.navList}>
          {NAV_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.navItem, i === NAV_ITEMS.length - 1 && styles.navItemLast]}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.navIconBg, { backgroundColor: item.color + "12" }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.navLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
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
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },

  // Hero
  hero: {
    marginBottom: spacing.xl,
  },
  appName: {
    ...typography.displayLarge,
    color: colors.primary,
    letterSpacing: 1,
  },
  tagline: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },

  // Today's card
  todayCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.base,
    ...shadows.lg,
  },
  todayTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  todayIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  todayIcon: { fontSize: 22 },
  todayMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  todayFieldBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
  },
  todayFieldText: {
    ...typography.labelSmall,
    color: colors.onPrimary,
  },
  todayLevel: {
    ...typography.labelSmall,
    color: "rgba(255,255,255,0.7)",
  },
  todayLabel: {
    ...typography.labelMedium,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  todayTitle: {
    ...typography.displaySmall,
    color: colors.onPrimary,
    marginBottom: spacing.md,
  },
  todayFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  todayAction: {
    ...typography.labelLarge,
    color: "rgba(255,255,255,0.85)",
  },

  // Continue
  continueCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
  },
  continueDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    marginRight: spacing.md,
  },
  continueInfo: { flex: 1 },
  continueLabel: {
    ...typography.titleSmall,
    color: colors.onSurface,
  },
  continueHint: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },

  // Sections
  section: { marginBottom: spacing.xl },
  sectionTitle: {
    ...typography.titleLarge,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },

  // Field grid
  fieldGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  fieldCard: {
    width: "47.5%",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.base,
    alignItems: "center",
  },
  fieldIconBg: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm + 2,
  },
  fieldIcon: { fontSize: 26 },
  fieldName: {
    ...typography.titleSmall,
    marginBottom: 2,
  },
  fieldCount: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },

  // Nav list
  navList: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.outlineVariant,
  },
  navItemLast: {
    borderBottomWidth: 0,
  },
  navIconBg: {
    width: 36,
    height: 36,
    borderRadius: radius.sm + 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  navLabel: {
    ...typography.titleSmall,
    color: colors.onSurface,
    flex: 1,
  },
});
