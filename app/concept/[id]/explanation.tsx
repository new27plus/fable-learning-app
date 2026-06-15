import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../../src/data/concepts";
import PrimaryButton from "../../../src/components/PrimaryButton";
import MetaphorTable from "../../../src/components/MetaphorTable";
import { initDatabase, toggleFavorite, isFavorite } from "../../../src/lib/db";
import { getFieldColor } from "../../../src/utils/concept";

export default function ExplanationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const concept = concepts.find((c) => c.id === id);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    initDatabase();
    if (id) {
      setFav(isFavorite(id));
    }
  }, [id]);

  if (!concept) {
    return (
      <View style={styles.center}>
        <Text>概念未找到</Text>
      </View>
    );
  }

  const fieldColor = getFieldColor(concept.field);

  const handleToggleFavorite = () => {
    const result = toggleFavorite(concept.id);
    setFav(result);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={[styles.headerCard, { backgroundColor: fieldColor + "10" }]}>
        <View style={styles.topBar}>
          <View style={[styles.badge, { backgroundColor: fieldColor }]}>
            <Text style={styles.badgeText}>{concept.field}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{concept.level}</Text>
          </View>
        </View>
        <Text style={[styles.conceptName, { color: fieldColor }]}>{concept.conceptName}</Text>
      </View>

      {/* Sections */}
      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: "#0984E3" }]} />
        <Text style={styles.sectionTitle}>💡 大白话解释</Text>
        <Text style={styles.bodyText}>{concept.plainExplanation}</Text>
      </View>

      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: "#6C5CE7" }]} />
        <Text style={styles.sectionTitle}>📘 正式定义</Text>
        <Text style={styles.bodyText}>{concept.formalDefinition}</Text>
      </View>

      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: "#FDCB6E" }]} />
        <Text style={styles.sectionTitle}>⭐ 为什么重要</Text>
        <Text style={styles.bodyText}>{concept.importance}</Text>
      </View>

      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: "#E17055" }]} />
        <Text style={styles.sectionTitle}>🔗 隐喻对应表</Text>
        <MetaphorTable data={concept.metaphorMap} />
      </View>

      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: "#FDCB6E" }]} />
        <Text style={styles.sectionTitle}>⚠️ 类比边界</Text>
        {concept.boundaries.map((b, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{b}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <View style={[styles.sectionAccent, { backgroundColor: "#00B894" }]} />
        <Text style={styles.sectionTitle}>📌 现实例子</Text>
        {concept.examples.map((ex, i) => (
          <View key={i} style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <Text style={styles.exampleTitle}>{ex.title}</Text>
              <View
                style={[
                  styles.exampleTag,
                  ex.type === "positive" ? styles.positiveTag : styles.negativeTag,
                ]}
              >
                <Text
                  style={[
                    styles.exampleTagText,
                    ex.type === "positive" ? styles.positiveText : styles.negativeText,
                  ]}
                >
                  {ex.type === "positive" ? "正面" : "反面"}
                </Text>
              </View>
            </View>
            <Text style={styles.exampleContent}>{ex.content}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <PrimaryButton
          title={fav ? "❤️ 已收藏" : "🤍 收藏此概念"}
          variant={fav ? "secondary" : "outline"}
          onPress={handleToggleFavorite}
        />
        <PrimaryButton
          title="开始测试"
          onPress={() => router.push(`/concept/${id}/quiz`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Header card
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  levelBadge: {
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  levelText: { fontSize: 13, color: "#636E72", fontWeight: "500" },
  conceptName: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 38,
  },

  // Section cards
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
  },
  sectionAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    color: "#2D3436",
    lineHeight: 26,
  },

  // Bullets
  bulletRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E17055",
    marginTop: 8,
    marginRight: 10,
  },
  bulletText: { flex: 1, fontSize: 15, color: "#2D3436", lineHeight: 22 },

  // Examples
  exampleCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  exampleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exampleTitle: { fontSize: 15, fontWeight: "600", color: "#2D3436" },
  exampleTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  positiveTag: { backgroundColor: "#D5F5E3" },
  negativeTag: { backgroundColor: "#FADBD8" },
  exampleTagText: { fontSize: 12, fontWeight: "600" },
  positiveText: { color: "#00B894" },
  negativeText: { color: "#E17055" },
  exampleContent: { fontSize: 14, color: "#636E72", lineHeight: 22 },

  // Actions
  actions: { marginTop: 8, gap: 8 },
});
