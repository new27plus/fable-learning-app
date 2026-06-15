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
      const finalScore = selectedIndex === question.answerIndex
        ? score
        : score;
      addLearningRecord(concept.id, score, concept.questions.length);
      setShowResult(true);
      setState("finished");
    }
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>
            {score === concept.questions.length
              ? "🎉"
              : score >= concept.questions.length / 2
              ? "👍"
              : "💪"}
          </Text>
          <Text style={styles.resultTitle}>测验完成！</Text>
          <Text style={styles.resultScore}>
            {score} / {concept.questions.length}
          </Text>
          <Text style={styles.resultDesc}>
            {score === concept.questions.length
              ? "满分通过，太棒了！"
              : score >= concept.questions.length / 2
              ? "不错，继续加油！"
              : "没关系，多学几次就好了！"}
          </Text>
          <View style={styles.resultActions}>
            <PrimaryButton
              title="返回首页"
              variant="secondary"
              onPress={() => router.push("/")}
            />
            <PrimaryButton
              title="再看一遍概念"
              variant="outline"
              onPress={() => router.push(`/concept/${id}/explanation`)}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${((currentIndex + 1) / concept.questions.length) * 100}%`,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        第 {currentIndex + 1} / {concept.questions.length} 题
      </Text>

      <Text style={styles.questionText}>{question.question}</Text>

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

      {state === "answered" && (
        <View style={styles.feedbackCard}>
          <Text style={isCorrect ? styles.correctTitle : styles.wrongTitle}>
            {isCorrect ? "✅ 回答正确！" : "❌ 回答错误"}
          </Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
          <PrimaryButton
            title={
              currentIndex < concept.questions.length - 1
                ? "下一题"
                : "查看结果"
            }
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
  progressBar: {
    height: 6,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#E17055",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    color: "#636E72",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 20,
    lineHeight: 28,
  },
  options: { marginBottom: 20 },
  feedbackCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
  resultCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  resultEmoji: { fontSize: 60, marginBottom: 16 },
  resultTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 12,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: "800",
    color: "#E17055",
    marginBottom: 12,
  },
  resultDesc: {
    fontSize: 16,
    color: "#636E72",
    marginBottom: 32,
    textAlign: "center",
  },
  resultActions: { width: "100%", gap: 8 },
});
