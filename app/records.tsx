import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { initDatabase, getLearningRecords } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import { getFieldColor } from "../src/utils/concept";
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
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const concept = concepts.find((c) => c.id === item.concept_id);
          const fieldColor = concept ? getFieldColor(concept.field) : "#636E72";
          return (
            <View style={styles.card}>
              <View style={[styles.cardAccent, { backgroundColor: fieldColor }]} />
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.conceptName}>
                    {concept?.conceptName || item.concept_id}
                  </Text>
                  <View style={[styles.fieldTag, { backgroundColor: fieldColor + "15" }]}>
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
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  list: { padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
  },
  cardAccent: { width: 5 },
  cardBody: { flex: 1, padding: 16 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  conceptName: { fontSize: 16, fontWeight: "700", color: "#2D3436", flex: 1 },
  fieldTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  fieldText: { fontSize: 12, fontWeight: "600" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 24, fontWeight: "800", color: "#E17055" },
  scoreTotal: { fontSize: 14, color: "#B2BEC3", marginLeft: 2 },
  date: { fontSize: 13, color: "#B2BEC3" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    padding: 40,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#0984E3" + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyIcon: { fontSize: 32 },
  emptyText: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 8 },
  emptyHint: { fontSize: 14, color: "#B2BEC3", textAlign: "center" },
});
