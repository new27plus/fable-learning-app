import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { initDatabase, getWrongAnswers } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import { getFieldColor } from "../src/utils/concept";
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
        <View style={styles.emptyIconBg}>
          <Text style={styles.emptyIcon}>📝</Text>
        </View>
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
          const fieldColor = concept ? getFieldColor(concept.field) : "#636E72";
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.conceptTag}>
                  {concept?.conceptName || item.concept_id}
                </Text>
                <View style={[styles.fieldTag, { backgroundColor: fieldColor + "15" }]}>
                  <Text style={[styles.fieldText, { color: fieldColor }]}>{concept?.field}</Text>
                </View>
              </View>
              <Text style={styles.question}>{item.question}</Text>
              <View style={styles.answerBox}>
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>你的答案</Text>
                  <Text style={styles.wrongAnswer}>{item.user_answer}</Text>
                </View>
                <View style={styles.answerDivider} />
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>正确答案</Text>
                  <Text style={styles.correctAnswer}>{item.correct_answer}</Text>
                </View>
              </View>
              <View style={styles.explanationBox}>
                <Text style={styles.explanationLabel}>💡 解析</Text>
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  conceptTag: { fontSize: 14, fontWeight: "700", color: "#2D3436", flex: 1 },
  fieldTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  fieldText: { fontSize: 12, fontWeight: "600" },
  question: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 12,
    lineHeight: 22,
  },
  answerBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  answerDivider: {
    height: 1,
    backgroundColor: "#E8E8E8",
    marginVertical: 8,
  },
  answerLabel: { fontSize: 12, color: "#B2BEC3", width: 60 },
  wrongAnswer: {
    fontSize: 14,
    color: "#E17055",
    fontWeight: "600",
    flex: 1,
  },
  correctAnswer: {
    fontSize: 14,
    color: "#00B894",
    fontWeight: "600",
    flex: 1,
  },
  explanationBox: {
    backgroundColor: "#FFF8F0",
    borderRadius: 10,
    padding: 12,
  },
  explanationLabel: { fontSize: 13, fontWeight: "600", color: "#636E72", marginBottom: 6 },
  explanation: { fontSize: 13, color: "#636E72", lineHeight: 20 },
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
    backgroundColor: "#FDCB6E" + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyIcon: { fontSize: 32 },
  emptyText: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 8 },
  emptyHint: { fontSize: 14, color: "#B2BEC3", textAlign: "center" },
});
