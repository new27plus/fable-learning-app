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
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroDecor}>
          <Text style={styles.heroEmoji}>📖</Text>
        </View>
        <Text style={styles.appName}>寓言学堂</Text>
        <Text style={styles.tagline}>用故事理解复杂概念</Text>
      </View>

      {/* Today's recommendation */}
      <TouchableOpacity
        style={styles.todayCard}
        onPress={() => router.push(`/concept/${todayConcept.id}/story`)}
        activeOpacity={0.8}
      >
        <View style={styles.todayDecor}>
          <Text style={styles.todayDecorText}>{FIELD_ICONS[todayConcept.field as Field]}</Text>
        </View>
        <View style={styles.todayContent}>
          <Text style={styles.todayLabel}>今日推荐</Text>
          <Text style={styles.todayTitle}>{todayConcept.storyTitle}</Text>
          <View style={styles.todayMeta}>
            <Text style={styles.todayField}>{todayConcept.field}</Text>
            <Text style={styles.todayDot}>·</Text>
            <Text style={styles.todayLevel}>{todayConcept.level}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Continue learning */}
      {lastConceptId && (
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => router.push(`/concept/${lastConceptId}/story`)}
          activeOpacity={0.8}
        >
          <View style={styles.continueIcon}>
            <Text style={styles.continueIconText}>▶</Text>
          </View>
          <View style={styles.continueInfo}>
            <Text style={styles.continueLabel}>继续学习</Text>
            <Text style={styles.continueHint}>上次学到的概念</Text>
          </View>
          <Text style={styles.continueArrow}>›</Text>
        </TouchableOpacity>
      )}

      {/* Fields */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学科探索</Text>
        <View style={styles.fieldGrid}>
          {FIELDS.map((field) => (
            <TouchableOpacity
              key={field}
              style={styles.fieldCard}
              onPress={() => router.push(`/fields/${field}`)}
              activeOpacity={0.7}
            >
              <View style={[styles.fieldIconBg, { backgroundColor: FIELD_COLORS[field] + "18" }]}>
                <Text style={styles.fieldIcon}>{FIELD_ICONS[field]}</Text>
              </View>
              <Text style={[styles.fieldName, { color: FIELD_COLORS[field] }]}>{field}</Text>
              <Text style={styles.fieldCount}>
                {concepts.filter((c) => c.field === field).length} 个概念
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>我的学习</Text>
        <View style={styles.navGrid}>
          {[
            { icon: "❤️", label: "我的收藏", route: "/favorites", color: "#E17055" },
            { icon: "📊", label: "学习记录", route: "/records", color: "#0984E3" },
            { icon: "📝", label: "错题本", route: "/wrong-answers", color: "#FDCB6E" },
            { icon: "⚙️", label: "设置", route: "/settings", color: "#636E72" },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.navCard}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.navIconBg, { backgroundColor: item.color + "18" }]}>
                <Text style={styles.navIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.navLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 20, paddingBottom: 40 },

  // Hero
  hero: { alignItems: "center", marginTop: 16, marginBottom: 28 },
  heroDecor: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E17055" + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  heroEmoji: { fontSize: 28 },
  appName: { fontSize: 34, fontWeight: "800", color: "#E17055", letterSpacing: 2 },
  tagline: { fontSize: 15, color: "#636E72", marginTop: 6, letterSpacing: 1 },

  // Today
  todayCard: {
    backgroundColor: "#E17055",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#E17055",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  todayDecor: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  todayDecorText: { fontSize: 24 },
  todayContent: { flex: 1 },
  todayLabel: { fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: "500", letterSpacing: 1 },
  todayTitle: { fontSize: 20, fontWeight: "700", color: "#FFF", marginTop: 4, lineHeight: 28 },
  todayMeta: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  todayField: { fontSize: 13, color: "rgba(255,255,255,0.85)" },
  todayDot: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginHorizontal: 6 },
  todayLevel: { fontSize: 13, color: "rgba(255,255,255,0.85)" },

  // Continue
  continueCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0984E3",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#0984E3",
  },
  continueIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0984E3" + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  continueIconText: { fontSize: 14, color: "#0984E3" },
  continueInfo: { flex: 1 },
  continueLabel: { fontSize: 15, fontWeight: "600", color: "#2D3436" },
  continueHint: { fontSize: 12, color: "#B2BEC3", marginTop: 2 },
  continueArrow: { fontSize: 22, color: "#B2BEC3", fontWeight: "300" },

  // Sections
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 14 },

  // Fields
  fieldGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  fieldCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  fieldIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  fieldIcon: { fontSize: 24 },
  fieldName: { fontSize: 15, fontWeight: "700" },
  fieldCount: { fontSize: 12, color: "#B2BEC3", marginTop: 4 },

  // Nav
  navGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  navCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  navIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  navIcon: { fontSize: 18 },
  navLabel: { fontSize: 14, fontWeight: "600", color: "#2D3436" },
});
