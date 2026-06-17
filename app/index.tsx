import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../src/data/concepts";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../src/utils/concept";
import { colors, typography, spacing, radius, shadows } from "../src/theme/tokens";
import type { Field } from "../src/types/concept";

const isWeb = Platform.OS === "web";

export default function HomeScreen() {
  const router = useRouter();
  const [todayConcept, setTodayConcept] = useState(concepts[0]);

  useEffect(() => {
    const dayIndex = new Date().getDate() % concepts.length;
    setTodayConcept(concepts[dayIndex]);
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Ionicons name="sparkles" size={14} color={colors.primary} />
              <Text style={styles.heroBadgeText}>完全离线 · 免费开源</Text>
            </View>
            <Text style={styles.appName}>寓言学堂</Text>
            <Text style={styles.tagline}>用故事理解复杂概念</Text>
            <Text style={styles.description}>
              通过精心编写的寓言故事，轻松学习经济学、心理学、管理学、计算机科学、哲学、金融学等领域的抽象概念。
            </Text>
            <TouchableOpacity
              style={styles.heroCta}
              onPress={() => router.push(`/concept/${todayConcept.id}/story`)}
              activeOpacity={0.85}
            >
              <Text style={styles.heroCtaText}>今日推荐：{todayConcept.storyTitle}</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroVisual}>
            <View style={styles.heroCard}>
              <View style={styles.heroCardHeader}>
                <View style={[styles.heroCardDot, { backgroundColor: colors.error }]} />
                <View style={[styles.heroCardDot, { backgroundColor: colors.accent }]} />
                <View style={[styles.heroCardDot, { backgroundColor: colors.success }]} />
              </View>
              <Text style={styles.heroCardIcon}>{FIELD_ICONS[todayConcept.field as Field]}</Text>
              <Text style={styles.heroCardTitle}>{todayConcept.storyTitle}</Text>
              <Text style={styles.heroCardField}>{todayConcept.field} · {todayConcept.level}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="book" size={28} color={colors.primary} />
            <Text style={styles.statNumber}>{concepts.length}</Text>
            <Text style={styles.statLabel}>精选概念</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="library" size={28} color={colors.secondary} />
            <Text style={styles.statNumber}>{FIELDS.length}</Text>
            <Text style={styles.statLabel}>学科领域</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="help-circle" size={28} color={colors.tertiary} />
            <Text style={styles.statNumber}>{concepts.length * 3}</Text>
            <Text style={styles.statLabel}>测验题目</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="infinite" size={28} color={colors.accent} />
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>免费使用</Text>
          </View>
        </View>

        {/* Fields Grid */}
        <View style={styles.fieldsSection}>
          <Text style={styles.sectionTitle}>探索学科领域</Text>
          <Text style={styles.sectionDesc}>每个领域都有精心编写的寓言故事，帮助你理解抽象概念</Text>
          <View style={styles.fieldsGrid}>
            {FIELDS.map((field) => {
              const color = FIELD_COLORS[field];
              const count = concepts.filter((c) => c.field === field).length;
              return (
                <TouchableOpacity
                  key={field}
                  style={[styles.fieldCard, { borderTopColor: color }]}
                  onPress={() => router.push(`/fields/${field}`)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.fieldIconBg, { backgroundColor: color + "12" }]}>
                    <Text style={styles.fieldIcon}>{FIELD_ICONS[field]}</Text>
                  </View>
                  <Text style={[styles.fieldName, { color }]}>{field}</Text>
                  <Text style={styles.fieldCount}>{count} 个概念</Text>
                  <View style={styles.fieldArrow}>
                    <Ionicons name="arrow-forward" size={16} color={color} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>学习方式</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconBg, { backgroundColor: colors.primaryContainer }]}>
                <Ionicons name="book" size={24} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>寓言故事</Text>
              <Text style={styles.featureDesc}>用生动的故事场景解释抽象概念，让学习变得有趣</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconBg, { backgroundColor: colors.secondaryContainer }]}>
                <Ionicons name="git-compare" size={24} color={colors.secondary} />
              </View>
              <Text style={styles.featureTitle}>隐喻映射</Text>
              <Text style={styles.featureDesc}>故事元素与理论概念的对应关系，加深理解</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconBg, { backgroundColor: colors.tertiaryContainer }]}>
                <Ionicons name="school" size={24} color={colors.tertiary} />
              </View>
              <Text style={styles.featureTitle}>知识测验</Text>
              <Text style={styles.featureDesc}>3道选择题巩固学习，检验理解程度</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerAppName}>寓言学堂</Text>
            <Text style={styles.footerDesc}>用故事理解复杂概念</Text>
          </View>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => Linking.openURL("https://github.com/new27plus/fable-learning-app")}>
              <Text style={styles.footerLink}>GitHub</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <Text style={styles.footerVersion}>v1.5</Text>
          </View>
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
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.xl,
  },

  // Hero Section
  heroSection: {
    flexDirection: isWeb ? "row" : "column",
    alignItems: "center",
    paddingVertical: spacing.xxxl * 2,
    gap: spacing.xxxl,
  },
  heroContent: {
    flex: 1,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    alignSelf: "flex-start",
    marginBottom: spacing.xl,
  },
  heroBadgeText: {
    ...typography.labelMedium,
    color: colors.primary,
  },
  appName: {
    fontSize: isWeb ? 56 : 34,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -1,
    lineHeight: isWeb ? 64 : 42,
  },
  tagline: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: "600",
    color: colors.onSurface,
    marginTop: spacing.md,
    lineHeight: isWeb ? 36 : 30,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    marginTop: spacing.lg,
    maxWidth: 500,
    lineHeight: 28,
  },
  heroCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.lg,
    marginTop: spacing.xl,
    alignSelf: "flex-start",
    ...shadows.glow(colors.primary),
  },
  heroCtaText: {
    ...typography.labelLarge,
    color: colors.onPrimary,
  },
  heroVisual: {
    flex: isWeb ? 0.8 : 1,
    width: isWeb ? "auto" : "100%",
  },
  heroCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.lg,
    alignItems: "center",
  },
  heroCardHeader: {
    flexDirection: "row",
    gap: spacing.sm,
    alignSelf: "flex-start",
    marginBottom: spacing.xl,
  },
  heroCardDot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
  },
  heroCardIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  heroCardTitle: {
    ...typography.headline,
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  heroCardField: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },

  // Stats Section
  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
    paddingVertical: spacing.xl,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: isWeb ? 200 : 150,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.sm,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.onSurface,
  },
  statLabel: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },

  // Fields Section
  fieldsSection: {
    paddingVertical: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: isWeb ? 32 : 22,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: spacing.sm,
    textAlign: isWeb ? "center" : "left",
  },
  sectionDesc: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    textAlign: isWeb ? "center" : "left",
    marginBottom: spacing.xl,
    maxWidth: 600,
    alignSelf: isWeb ? "center" : "flex-start",
  },
  fieldsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
  },
  fieldCard: {
    width: isWeb ? "31%" : "47.5%",
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderTopWidth: 3,
    ...shadows.md,
  },
  fieldIconBg: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  fieldIcon: { fontSize: 28 },
  fieldName: {
    ...typography.titleMedium,
    marginBottom: spacing.xs,
  },
  fieldCount: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },
  fieldArrow: {
    marginTop: spacing.md,
  },

  // Features Section
  featuresSection: {
    paddingVertical: spacing.xl,
    marginBottom: spacing.xl,
  },
  featuresGrid: {
    flexDirection: isWeb ? "row" : "column",
    gap: spacing.lg,
  },
  featureCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: isWeb ? "center" : "flex-start",
  },
  featureIconBg: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  featureTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
    marginBottom: spacing.sm,
    textAlign: isWeb ? "center" : "left",
  },
  featureDesc: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    textAlign: isWeb ? "center" : "left",
    lineHeight: 24,
  },

  // Footer
  footer: {
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    gap: spacing.lg,
  },
  footerContent: {
    alignItems: isWeb ? "flex-start" : "center",
  },
  footerAppName: {
    ...typography.titleMedium,
    color: colors.primary,
  },
  footerDesc: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  footerLink: {
    ...typography.body,
    color: colors.primary,
  },
  footerDot: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },
  footerVersion: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },
});
