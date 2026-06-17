import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../../../src/data/concepts";
import QuizOption from "../../../src/components/QuizOption";
import PrimaryButton from "../../../src/components/PrimaryButton";
import { addLearningRecord, addWrongAnswer } from "../../../src/lib/db";
import { colors, typography, spacing, radius, shadows } from "../../../src/theme/tokens";

const isWeb = Platform.OS === "web";
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
    } else if (!isWeb) {
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
      if (!isWeb) {
        addLearningRecord(concept.id, score, concept.questions.length);
      }
      setShowResult(true);
      setState("finished");
    }
  };

  const getResultIcon = () => {
    if (score === concept.questions.length) return "trophy";
    if (score >= concept.questions.length / 2) return "thumbs-up";
    return "fitness";
  };

  const getResultText = () => {
    if (score === concept.questions.length) return "满分通过，太棒了！";
    if (score >= concept.questions.length / 2) return "不错，继续加油！";
    return "没关系，多学几次就好了！";
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
          <Ionicons name={getResultIcon()} size={56} color={colors.primary} style={styles.resultIcon} />
          <Text style={styles.resultTitle}>测验完成！</Text>
          <Text style={styles.resultDesc}>{getResultText()}</Text>
          <View style={styles.resultActions}>
            <PrimaryButton title="返回首页" variant="secondary" onPress={() => router.push("/")} />
            <PrimaryButton title="再看一遍概念" variant="outline" onPress={() => router.push(`/concept/${id}/explanation`)} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Breadcrumb */}
        {isWeb && (
          <View style={styles.breadcrumb}>
            <Text style={styles.breadcrumbLink} onPress={() => router.push("/")}>首页</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.onSurfaceVariant} />
            <Text style={styles.breadcrumbCurrent}>测验</Text>
          </View>
        )}

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
          <Text style={styles.questionNumber}>问题 {currentIndex + 1}</Text>
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
            <View style={styles.feedbackHeader}>
              <Ionicons
                name={isCorrect ? "checkmark-circle" : "close-circle"}
                size={24}
                color={isCorrect ? colors.success : colors.error}
              />
              <Text style={isCorrect ? styles.correctTitle : styles.wrongTitle}>
                {isCorrect ? "回答正确！" : "回答错误"}
              </Text>
            </View>
            <Text style={styles.explanation}>{question.explanation}</Text>
            <PrimaryButton
              title={currentIndex < concept.questions.length - 1 ? "下一题" : "查看结果"}
              onPress={handleNext}
              icon="arrow-forward"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  breadcrumbLink: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  breadcrumbCurrent: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },

  // Progress
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radius.full,
    marginRight: spacing.md,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  progressText: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
    minWidth: 50,
  },

  // Question
  questionCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.xl,
    padding: isWeb ? spacing.xl * 1.5 : spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  questionNumber: {
    ...typography.labelMedium,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  questionText: {
    fontSize: isWeb ? 24 : 20,
    fontWeight: "600",
    color: colors.onSurface,
    lineHeight: isWeb ? 36 : 28,
  },

  options: {
    marginBottom: spacing.lg,
    gap: spacing.md,
  },

  // Feedback
  feedbackCard: {
    borderRadius: radius.xl,
    padding: isWeb ? spacing.xl : spacing.base + 2,
    marginTop: spacing.md,
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
  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  correctTitle: {
    ...typography.titleLarge,
    color: colors.success,
  },
  wrongTitle: {
    ...typography.titleLarge,
    color: colors.error,
  },
  explanation: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xl,
    lineHeight: 28,
  },

  // Result
  resultScreen: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  resultCard: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
    maxWidth: 500,
    width: "100%",
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceBright,
    justifyContent: "center",
    ...shadows.lg,
    marginBottom: spacing.xl,
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreNumber: {
    fontSize: 52,
    fontWeight: "800",
    color: colors.primary,
  },
  scoreSlash: {
    fontSize: 26,
    color: colors.onSurfaceVariant,
    marginHorizontal: 3,
  },
  scoreTotal: {
    fontSize: 26,
    color: colors.onSurfaceVariant,
  },
  resultIcon: {
    marginBottom: spacing.lg,
  },
  resultTitle: {
    fontSize: isWeb ? 32 : 22,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  resultDesc: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xxxl,
    textAlign: "center",
  },
  resultActions: {
    width: "100%",
    gap: spacing.md,
    maxWidth: 300,
  },
});
