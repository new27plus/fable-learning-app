import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../../src/utils/concept";
import { concepts } from "../../src/data/concepts";
import { colors, typography, spacing, radius, shadows } from "../../src/theme/tokens";

export default function FieldsIndex() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>选择你感兴趣的学科</Text>
      <Text style={styles.headerDesc}>每个学科都有精心编写的寓言故事</Text>
      {FIELDS.map((field) => {
        const count = concepts.filter((c) => c.field === field).length;
        const fieldColor = FIELD_COLORS[field];
        return (
          <TouchableOpacity
            key={field}
            style={styles.card}
            onPress={() => router.push(`/fields/${field}`)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBg, { backgroundColor: fieldColor + "14" }]}>
              <Text style={styles.icon}>{FIELD_ICONS[field]}</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: fieldColor }]}>{field}</Text>
              <Text style={styles.count}>{count} 个概念</Text>
            </View>
            <View style={[styles.arrowBg, { backgroundColor: fieldColor + "10" }]}>
              <Text style={[styles.arrow, { color: fieldColor }]}>→</Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
  },
  headerTitle: {
    ...typography.headline,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  headerDesc: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  name: {
    ...typography.titleMedium,
  },
  count: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  arrowBg: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: { fontSize: 18 },
});
