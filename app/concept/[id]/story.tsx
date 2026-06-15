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
        <Text style={styles.field}>{concept.field}</Text>
        <Text style={styles.level}>{concept.level}</Text>
      </View>
      <Text style={styles.storyTitle}>{concept.storyTitle}</Text>
      <View style={styles.divider} />
      <Text style={styles.fable}>{concept.fable}</Text>
      <View style={styles.revealSection}>
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
    marginBottom: 12,
  },
  field: {
    fontSize: 13,
    fontWeight: "600",
    color: "#E17055",
    backgroundColor: "#FDECEA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 8,
  },
  level: {
    fontSize: 13,
    color: "#636E72",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 16,
    lineHeight: 32,
  },
  divider: {
    height: 2,
    backgroundColor: "#E17055",
    width: 40,
    marginBottom: 20,
    borderRadius: 1,
  },
  fable: {
    fontSize: 17,
    color: "#2D3436",
    lineHeight: 30,
    textAlign: "justify",
  },
  revealSection: {
    marginTop: 32,
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  hint: {
    fontSize: 15,
    color: "#636E72",
    marginBottom: 16,
  },
});
