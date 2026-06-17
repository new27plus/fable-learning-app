import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { initDatabase, getLearningRecords } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import { getFieldColor } from "../src/utils/concept";
import { colors, typography, spacing, radius, shadows } from "../src/theme/tokens";
import type { LearningRecord } from "../src/types/concept";

export default function RecordsScreen() {
  const [records, setRecords] = useState<LearningRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      initDatabase();
      setRecords(getLearningRecords());
    }, [])
  );

  if (records.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.emptyIconBg}>
          <Text style={styles.emptyIcon}>📊</Text>
        </View>
        <Text style={styles.emptyText}>还没有学习记录</Text>
        <Text style={styles.emptyHint}>完成测验后会自动记录</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={records}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const concept = concepts.find((c) => c.id === item.concept_id);
          const fieldColor = concept ? getFieldColor(concept.field) : colors.onSurfaceVariant;
          return (
            <View style={styles.card}>
              <View style={[styles.cardAccent, { backgroundColor: fieldColor }]} />
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.conceptName}>
                    {concept?.conceptName || item.concept_id}
                  </Text>
                  <View style={[styles.fieldTag, { backgroundColor: fieldColor + "14" }]}>
                    <Text style={[styles.fieldText, { color: fieldColor }]}>{concept?.field}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.scoreRow}>
                    <Text style={styles.scoreValue}>{item.score}</Text>
                    <Text style={styles.scoreTotal}>/{item.total_questions}</Text>
                  </View>
                  <Text style={styles.date}>
                    {new Date(item.completed_at).toLocaleDateString("zh-CN")}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: { padding: spacing.lg },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
    overflow: "hidden",
  },
  cardAccent: { width: 4 },
  cardBody: { flex: 1, padding: spacing.base },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm + 2,
  },
  conceptName: {
    ...typography.titleSmall,
    color: colors.onSurface,
    flex: 1,
  },
  fieldTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
    marginLeft: spacing.sm,
  },
  fieldText: { ...typography.labelSmall },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
  },
  scoreTotal: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginLeft: 2,
  },
  date: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.xxxl,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.base,
  },
  emptyIcon: { fontSize: 32 },
  emptyText: {
    ...typography.titleMedium,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  emptyHint: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
});
