import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing, radius, shadows } from "../src/theme/tokens";

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>
      {/* App info */}
      <View style={styles.logoSection}>
        <View style={styles.logoBg}>
          <Text style={styles.logoEmoji}>📖</Text>
        </View>
        <Text style={styles.appName}>寓言学堂</Text>
        <Text style={styles.appDesc}>用故事理解复杂概念</Text>
      </View>

      {/* Info card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>当前版本</Text>
          <View style={styles.valueTag}>
            <Text style={styles.valueText}>MVP 离线版</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>数据存储</Text>
          <Text style={styles.value}>本地 SQLite</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>隐私说明</Text>
          <Text style={[styles.value, { flex: 1, textAlign: "right" }]}>
            当前版本不上传任何学习数据
          </Text>
        </View>
      </View>

      {/* Placeholder card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>即将推出</Text>
        {[
          { icon: "🤖", label: "AI 生成模式" },
          { icon: "🔑", label: "用户自带 API Key" },
          { icon: "☁️", label: "云端同步" },
        ].map((item, i) => (
          <View key={i}>
            {i > 0 && <View style={styles.divider} />}
            <View style={styles.placeholderRow}>
              <Text style={styles.placeholderIcon}>{item.icon}</Text>
              <Text style={styles.placeholderText}>{item.label}</Text>
              <View style={styles.comingSoonTag}>
                <Text style={styles.comingSoonText}>即将推出</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>寓言学堂 · V1.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },

  // Logo
  logoSection: {
    alignItems: "center",
    marginBottom: spacing.xxl,
    marginTop: spacing.sm,
  },
  logoBg: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm + 2,
  },
  logoEmoji: { fontSize: 32 },
  appName: {
    ...typography.headline,
    color: colors.primary,
  },
  appDesc: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },

  // Cards
  card: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm + 2,
  },
  label: {
    ...typography.titleSmall,
    color: colors.onSurface,
  },
  value: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },
  valueTag: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.xs,
  },
  valueText: {
    ...typography.labelMedium,
    color: colors.primary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
  },
  sectionTitle: {
    ...typography.titleSmall,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  placeholderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm + 2,
  },
  placeholderIcon: { fontSize: 18, marginRight: spacing.sm + 2 },
  placeholderText: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  comingSoonTag: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
  },
  comingSoonText: {
    ...typography.labelSmall,
    color: colors.onSurfaceVariant,
  },
  footer: {
    textAlign: "center",
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: spacing.md,
  },
});
