import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { initDatabase, getLearningRecords } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
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
        <Text style={styles.emptyIcon}>📊</Text>
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
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.conceptName}>
                  {concept?.conceptName || item.concept_id}
                </Text>
                <Text style={styles.field}>{concept?.field}</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreValue}>{item.score}</Text>
                  <Text style={styles.scoreTotal}>/{item.total_questions}</Text>
                </View>
                <Text style={styles.date}>
                  {new Date(item.completed_at).toLocaleDateString("zh-CN")}
                </Text>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  conceptName: { fontSize: 16, fontWeight: "700", color: "#2D3436", flex: 1 },
  field: {
    fontSize: 12,
    color: "#E17055",
    backgroundColor: "#FDECEA",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: "hidden",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreBox: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 24, fontWeight: "800", color: "#E17055" },
  scoreTotal: { fontSize: 14, color: "#636E72", marginLeft: 2 },
  date: { fontSize: 13, color: "#B2BEC3" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    padding: 40,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: "600", color: "#2D3436", marginBottom: 8 },
  emptyHint: { fontSize: 14, color: "#636E72", textAlign: "center" },
});
