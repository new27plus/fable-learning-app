import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../../src/data/concepts";
import QuizOption from "../../../src/components/QuizOption";
import PrimaryButton from "../../../src/components/PrimaryButton";
import { addLearningRecord, addWrongAnswer } from "../../../src/lib/db";
import { colors, typography, spacing, radius, shadows } from "../../../src/theme/tokens";

type QuizState = "answering" | "answered" | "finished";

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const concept = concepts.find((c) => c.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [state, setState] = useState<QuizState>("answering");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!concept) {
    return (
      <View style={styles.center}>
        <Text style={typography.body}>概念未找到</Text>
      </View>
    );
  }

  const question = concept.questions[currentIndex];
  const isCorrect = selectedIndex === question.answerIndex;

  const handleSelect = (index: number) => {
    if (state !== "answering") return;
    setSelectedIndex(index);
    setState("answered");

    if (index === question.answerIndex) {
      setScore((s) => s + 1);
    } else {
      addWrongAnswer(
        concept.id,
        question.id,
        question.question,
        question.options[index],
        question.options[question.answerIndex],
        question.explanation
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < concept.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setState("answering");
    } else {
      addLearningRecord(concept.id, score, concept.questions.length);
      setShowResult(true);
      setState("finished");
    }
  };

  if (showResult) {
    return (
      <View style={styles.resultScreen}>
        <View style={styles.resultCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreSlash}>/</Text>
            <Text style={styles.scoreTotal}>{concept.questions.length}</Text>
          </View>
          <Text style={styles.resultEmoji}>
            {score === concept.questions.length ? "🎉" : score >= concept.questions.length / 2 ? "👍" : "💪"}
          </Text>
          <Text style={styles.resultTitle}>测验完成！</Text>
          <Text style={styles.resultDesc}>
            {score === concept.questions.length
              ? "满分通过，太棒了！"
              : score >= concept.questions.length / 2
              ? "不错，继续加油！"
              : "没关系，多学几次就好了！"}
          </Text>
          <View style={styles.resultActions}>
            <PrimaryButton title="返回首页" variant="secondary" onPress={() => router.push("/")} />
            <PrimaryButton title="再看一遍概念" variant="outline" onPress={() => router.push(`/concept/${id}/explanation`)} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Progress */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / concept.questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {concept.questions.length}
        </Text>
      </View>

      {/* Question card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {question.options.map((opt, i) => (
          <QuizOption
            key={i}
            label={opt}
            index={i}
            selected={selectedIndex === i}
            correct={
              state === "answered"
                ? i === question.answerIndex
                  ? true
                  : selectedIndex === i
                  ? false
                  : null
                : null
            }
            disabled={state !== "answering"}
            onPress={() => handleSelect(i)}
          />
        ))}
      </View>

      {/* Feedback */}
      {state === "answered" && (
        <View style={[styles.feedbackCard, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <Text style={isCorrect ? styles.correctTitle : styles.wrongTitle}>
            {isCorrect ? "✅ 回答正确！" : "❌ 回答错误"}
          </Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
          <PrimaryButton
            title={currentIndex < concept.questions.length - 1 ? "下一题" : "查看结果"}
            onPress={handleNext}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  // Progress
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radius.full,
    marginRight: spacing.sm + 2,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  progressText: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
    minWidth: 40,
  },

  // Question
  questionCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  questionText: {
    ...typography.titleLarge,
    color: colors.onSurface,
  },

  options: { marginBottom: spacing.base },

  // Feedback
  feedbackCard: {
    borderRadius: radius.lg,
    padding: spacing.base + 2,
    marginTop: spacing.xs,
    ...shadows.md,
  },
  feedbackCorrect: {
    backgroundColor: colors.successContainer,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  feedbackWrong: {
    backgroundColor: colors.errorContainer,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  correctTitle: {
    ...typography.titleMedium,
    color: colors.success,
    marginBottom: spacing.sm + 2,
  },
  wrongTitle: {
    ...typography.titleMedium,
    color: colors.error,
    marginBottom: spacing.sm + 2,
  },
  explanation: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.base,
  },

  // Result
  resultScreen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  resultCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceBright,
    justifyContent: "center",
    ...shadows.lg,
    marginBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreNumber: {
    fontSize: 44,
    fontWeight: "800",
    color: colors.primary,
  },
  scoreSlash: {
    fontSize: 22,
    color: colors.onSurfaceVariant,
    marginHorizontal: 2,
  },
  scoreTotal: {
    fontSize: 22,
    color: colors.onSurfaceVariant,
  },
  resultEmoji: { fontSize: 48, marginBottom: spacing.md },
  resultTitle: {
    ...typography.headline,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  resultDesc: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xxl,
    textAlign: "center",
  },
  resultActions: { width: "100%", gap: spacing.sm },
});
