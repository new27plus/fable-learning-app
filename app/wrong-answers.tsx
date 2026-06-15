import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { initDatabase, getWrongAnswers } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import type { WrongAnswer } from "../src/types/concept";

export default function WrongAnswersScreen() {
  const [wrongs, setWrongs] = useState<WrongAnswer[]>([]);

  useFocusEffect(
    useCallback(() => {
      initDatabase();
      setWrongs(getWrongAnswers());
    }, [])
  );

  if (wrongs.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📝</Text>
        <Text style={styles.emptyText}>还没有错题</Text>
        <Text style={styles.emptyHint}>做测验时答错的题会出现在这里</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wrongs}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const concept = concepts.find((c) => c.id === item.concept_id);
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.conceptTag}>
                  {concept?.conceptName || item.concept_id}
                </Text>
                <Text style={styles.fieldTag}>{concept?.field}</Text>
              </View>
              <Text style={styles.question}>{item.question}</Text>
              <View style={styles.answerRow}>
                <Text style={styles.label}>你的答案：</Text>
                <Text style={styles.wrongAnswer}>{item.user_answer}</Text>
              </View>
              <View style={styles.answerRow}>
                <Text style={styles.label}>正确答案：</Text>
                <Text style={styles.correctAnswer}>{item.correct_answer}</Text>
              </View>
              <View style={styles.explanationBox}>
                <Text style={styles.explanationLabel}>解析：</Text>
                <Text style={styles.explanation}>{item.explanation}</Text>
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
  conceptTag: { fontSize: 14, fontWeight: "700", color: "#2D3436" },
  fieldTag: {
    fontSize: 11,
    color: "#E17055",
    backgroundColor: "#FDECEA",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  question: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 12,
    lineHeight: 22,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: { fontSize: 13, color: "#636E72", marginRight: 4 },
  wrongAnswer: {
    fontSize: 13,
    color: "#E17055",
    fontWeight: "600",
    flex: 1,
  },
  correctAnswer: {
    fontSize: 13,
    color: "#00B894",
    fontWeight: "600",
    flex: 1,
  },
  explanationBox: {
    marginTop: 10,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
  },
  explanationLabel: { fontSize: 13, fontWeight: "600", color: "#636E72", marginBottom: 4 },
  explanation: { fontSize: 13, color: "#636E72", lineHeight: 20 },
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
