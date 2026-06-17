import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../../src/utils/concept";
import { concepts } from "../../src/data/concepts";
import { colors, typography, spacing, radius, shadows } from "../../src/theme/tokens";

const isWeb = Platform.OS === "web";

export default function FieldsIndex() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>选择你感兴趣的学科</Text>
          <Text style={styles.headerDesc}>每个学科都有精心编写的寓言故事，帮助你理解抽象概念</Text>
        </View>

        <View style={styles.grid}>
          {FIELDS.map((field) => {
            const count = concepts.filter((c) => c.field === field).length;
            const fieldColor = FIELD_COLORS[field];
            return (
              <TouchableOpacity
                key={field}
                style={[styles.card, { borderLeftColor: fieldColor }]}
                onPress={() => router.push(`/fields/${field}`)}
                activeOpacity={0.85}
              >
                <View style={[styles.iconBg, { backgroundColor: fieldColor + "12" }]}>
                  <Text style={styles.icon}>{FIELD_ICONS[field]}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={[styles.name, { color: fieldColor }]}>{field}</Text>
                  <Text style={styles.count}>{count} 个概念</Text>
                </View>
                <View style={[styles.arrowBg, { backgroundColor: fieldColor + "10" }]}>
                  <Ionicons name="chevron-forward" size={18} color={fieldColor} />
                </View>
              </TouchableOpacity>
            );
          })}
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
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: isWeb ? "center" : "flex-start",
  },
  headerTitle: {
    fontSize: isWeb ? 32 : 22,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  headerDesc: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    maxWidth: 500,
    textAlign: isWeb ? "center" : "left",
  },
  grid: {
    gap: spacing.lg,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderLeftWidth: 4,
    ...shadows.md,
  },
  iconBg: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.lg,
  },
  icon: { fontSize: 28 },
  info: { flex: 1 },
  name: {
    ...typography.titleLarge,
    marginBottom: spacing.xs,
  },
  count: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },
  arrowBg: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
