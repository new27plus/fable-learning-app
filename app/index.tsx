import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { concepts } from "../src/data/concepts";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../src/utils/concept";
import { initDatabase, getLearningRecords } from "../src/lib/db";
import type { Field } from "../src/types/concept";

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.appName}>寓言学堂</Text>
        <Text style={styles.tagline}>用故事理解复杂概念</Text>
      </View>

      <TouchableOpacity
        style={styles.todayCard}
        onPress={() => router.push(`/concept/${todayConcept.id}/story`)}
        activeOpacity={0.7}
      >
        <Text style={styles.todayLabel}>📖 今日推荐</Text>
        <Text style={styles.todayTitle}>{todayConcept.storyTitle}</Text>
        <Text style={styles.todayField}>
          {todayConcept.field} · {todayConcept.level}
        </Text>
      </TouchableOpacity>

      {lastConceptId && (
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => router.push(`/concept/${lastConceptId}/story`)}
          activeOpacity={0.7}
        >
          <Text style={styles.continueLabel}>▶ 继续学习</Text>
          <Text style={styles.continueHint}>上次学到的概念</Text>
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学科探索</Text>
        <View style={styles.fieldGrid}>
          {FIELDS.map((field) => (
            <TouchableOpacity
              key={field}
              style={[styles.fieldCard, { backgroundColor: FIELD_COLORS[field] + "15" }]}
              onPress={() => router.push(`/fields/${field}`)}
              activeOpacity={0.7}
            >
              <Text style={styles.fieldIcon}>{FIELD_ICONS[field]}</Text>
              <Text style={[styles.fieldName, { color: FIELD_COLORS[field] }]}>{field}</Text>
              <Text style={styles.fieldCount}>
                {concepts.filter((c) => c.field === field).length} 个概念
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/favorites")}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>❤️</Text>
          <Text style={styles.navLabel}>我的收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/records")}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navLabel}>学习记录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/wrong-answers")}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>📝</Text>
          <Text style={styles.navLabel}>错题本</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navCard}
          onPress={() => router.push("/settings")}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>设置</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: "center", marginTop: 20, marginBottom: 24 },
  appName: { fontSize: 32, fontWeight: "800", color: "#E17055" },
  tagline: { fontSize: 15, color: "#636E72", marginTop: 6 },
  todayCard: {
    backgroundColor: "#E17055",
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
  },
  todayLabel: { fontSize: 13, color: "#FFEAA7", fontWeight: "600" },
  todayTitle: { fontSize: 20, fontWeight: "700", color: "#FFF", marginTop: 8 },
  todayField: { fontSize: 13, color: "#FFEAA7", marginTop: 6 },
  continueCard: {
    backgroundColor: "#0984E3",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueLabel: { fontSize: 15, fontWeight: "600", color: "#FFF" },
  continueHint: { fontSize: 12, color: "#DFE6E9" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 12 },
  fieldGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  fieldCard: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  fieldIcon: { fontSize: 28, marginBottom: 6 },
  fieldName: { fontSize: 15, fontWeight: "700" },
  fieldCount: { fontSize: 12, color: "#636E72", marginTop: 4 },
  navRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  navCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  navIcon: { fontSize: 24, marginBottom: 6 },
  navLabel: { fontSize: 14, fontWeight: "600", color: "#2D3436" },
});
