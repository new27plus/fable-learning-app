import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../../src/data/concepts";
import PrimaryButton from "../../../src/components/PrimaryButton";

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    return (
      <View style={styles.center}>
        <Text>概念未找到</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.storyHeader}>
        <View style={styles.fieldBadge}>
          <Text style={styles.fieldText}>{concept.field}</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{concept.level}</Text>
        </View>
      </View>

      <View style={styles.quoteDecor}>
        <Text style={styles.quoteChar}>"</Text>
      </View>

      <Text style={styles.storyTitle}>{concept.storyTitle}</Text>

      <View style={styles.divider} />

      <Text style={styles.fable}>{concept.fable}</Text>

      <View style={styles.revealSection}>
        <View style={styles.revealDivider} />
        <Text style={styles.revealEmoji}>🔍</Text>
        <Text style={styles.hint}>准备好了解这个概念了吗？</Text>
        <PrimaryButton
          title="揭示概念"
          onPress={() => router.push(`/concept/${id}/explanation`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  fieldBadge: {
    backgroundColor: "#E17055",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
  },
  fieldText: { fontSize: 13, fontWeight: "600", color: "#FFF" },
  levelBadge: {
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  levelText: { fontSize: 13, color: "#636E72", fontWeight: "500" },
  quoteDecor: {
    marginBottom: 4,
  },
  quoteChar: {
    fontSize: 48,
    color: "#E17055",
    fontWeight: "800",
    lineHeight: 52,
    opacity: 0.3,
  },
  storyTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 16,
    lineHeight: 36,
  },
  divider: {
    height: 3,
    backgroundColor: "#E17055",
    width: 36,
    marginBottom: 24,
    borderRadius: 2,
  },
  fable: {
    fontSize: 18,
    color: "#2D3436",
    lineHeight: 34,
    textAlign: "justify",
  },
  revealSection: {
    marginTop: 36,
    alignItems: "center",
    paddingTop: 24,
  },
  revealDivider: {
    width: 60,
    height: 1,
    backgroundColor: "#DDD",
    marginBottom: 20,
  },
  revealEmoji: { fontSize: 28, marginBottom: 10 },
  hint: {
    fontSize: 15,
    color: "#636E72",
    marginBottom: 16,
  },
});
