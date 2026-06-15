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
      <View style={styles.topBar}>
        <View style={[styles.badge, { backgroundColor: fieldColor }]}>
          <Text style={styles.badgeText}>{concept.field}</Text>
        </View>
        <Text style={styles.level}>{concept.level}</Text>
      </View>

      <Text style={styles.conceptName}>{concept.conceptName}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 大白话解释</Text>
        <Text style={styles.bodyText}>{concept.plainExplanation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📘 正式定义</Text>
        <Text style={styles.bodyText}>{concept.formalDefinition}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ 为什么重要</Text>
        <Text style={styles.bodyText}>{concept.importance}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 隐喻对应表</Text>
        <MetaphorTable data={concept.metaphorMap} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ 类比边界</Text>
        {concept.boundaries.map((b, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{b}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 现实例子</Text>
        {concept.examples.map((ex, i) => (
          <View key={i} style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <Text style={styles.exampleTitle}>{ex.title}</Text>
              <Text
                style={[
                  styles.exampleType,
                  ex.type === "positive" ? styles.positive : styles.negative,
                ]}
              >
                {ex.type === "positive" ? "正面" : "反面"}
              </Text>
            </View>
            <Text style={styles.exampleContent}>{ex.content}</Text>
          </View>
        ))}
      </View>

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
  content: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  level: {
    fontSize: 13,
    color: "#636E72",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  conceptName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 24,
    lineHeight: 34,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 15,
    color: "#2D3436",
    lineHeight: 26,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 8,
    paddingLeft: 4,
  },
  bullet: { color: "#E17055", marginRight: 8, fontSize: 15 },
  bulletText: { flex: 1, fontSize: 15, color: "#2D3436", lineHeight: 22 },
  exampleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  exampleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exampleTitle: { fontSize: 15, fontWeight: "600", color: "#2D3436" },
  exampleType: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  positive: { backgroundColor: "#D5F5E3", color: "#00B894" },
  negative: { backgroundColor: "#FADBD8", color: "#E17055" },
  exampleContent: { fontSize: 14, color: "#636E72", lineHeight: 22 },
  actions: { marginTop: 10, gap: 8 },
});
