import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../../src/data/concepts";
import QuizOption from "../../../src/components/QuizOption";
import PrimaryButton from "../../../src/components/PrimaryButton";
import { initDatabase, addLearningRecord, addWrongAnswer } from "../../../src/lib/db";

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
        <Text>概念未找到</Text>
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
    const pct = Math.round((score / concept.questions.length) * 100);
    return (
      <View style={styles.container}>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Progress
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#E17055",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636E72",
    minWidth: 40,
  },

  // Question
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    lineHeight: 28,
  },

  options: { marginBottom: 16 },

  // Feedback
  feedbackCard: {
    borderRadius: 14,
    padding: 18,
    marginTop: 4,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  feedbackCorrect: {
    backgroundColor: "#EAFAF1",
    borderLeftWidth: 4,
    borderLeftColor: "#00B894",
  },
  feedbackWrong: {
    backgroundColor: "#FDEDEC",
    borderLeftWidth: 4,
    borderLeftColor: "#E17055",
  },
  correctTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#00B894",
    marginBottom: 10,
  },
  wrongTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E17055",
    marginBottom: 10,
  },
  explanation: {
    fontSize: 14,
    color: "#636E72",
    lineHeight: 22,
    marginBottom: 16,
  },

  // Result
  resultCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFF8F0",
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    shadowColor: "#E17055",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreNumber: {
    fontSize: 42,
    fontWeight: "800",
    color: "#E17055",
  },
  scoreSlash: {
    fontSize: 22,
    color: "#B2BEC3",
    marginHorizontal: 2,
  },
  scoreTotal: {
    fontSize: 22,
    color: "#B2BEC3",
  },
  resultEmoji: { fontSize: 48, marginBottom: 12 },
  resultTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 16,
    color: "#636E72",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  resultActions: { width: "100%", gap: 8 },
});
