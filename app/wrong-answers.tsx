import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { initDatabase, getWrongAnswers } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import { getFieldColor } from "../src/utils/concept";
import { colors, typography, spacing, radius, shadows } from "../src/theme/tokens";
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
          <Ionicons name="document-text" size={32} color={colors.tertiary} />
        </View>
        <Text style={styles.emptyText}>还没有错题</Text>
        <Text style={styles.emptyHint}>做测验时答错的题会出现在这里</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={wrongs}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const concept = concepts.find((c) => c.id === item.concept_id);
          const fieldColor = concept ? getFieldColor(concept.field) : colors.onSurfaceVariant;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.conceptTag}>
                  {concept?.conceptName || item.concept_id}
                </Text>
                <View style={[styles.fieldTag, { backgroundColor: fieldColor + "14" }]}>
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
                <View style={styles.explanationHeader}>
                  <Ionicons name="bulb" size={16} color={colors.accent} />
                  <Text style={styles.explanationLabel}>解析</Text>
                </View>
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
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: { padding: spacing.lg },
  card: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm + 2,
  },
  conceptTag: {
    ...typography.titleSmall,
    color: colors.onSurface,
    flex: 1,
  },
  fieldTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs,
    marginLeft: spacing.sm,
  },
  fieldText: { ...typography.labelSmall },
  question: {
    ...typography.titleSmall,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  answerBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  answerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginVertical: spacing.sm,
  },
  answerLabel: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    width: 60,
  },
  wrongAnswer: {
    ...typography.body,
    color: colors.error,
    fontWeight: "600",
    flex: 1,
  },
  correctAnswer: {
    ...typography.body,
    color: colors.success,
    fontWeight: "600",
    flex: 1,
  },
  explanationBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  explanationLabel: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
  },
  explanation: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.xxxl,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.tertiaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.base,
  },
  emptyText: {
    ...typography.titleMedium,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  emptyHint: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
});
