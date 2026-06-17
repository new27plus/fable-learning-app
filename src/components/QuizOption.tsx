import React, { useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing, radius } from "../theme/tokens";

const LABELS = ["A", "B", "C", "D"];

interface Props {
  label: string;
  index: number;
  selected: boolean;
  correct: boolean | null;
  disabled: boolean;
  onPress: () => void;
}

export default function QuizOption({ label, index, selected, correct, disabled, onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 6,
        }),
      ]).start();
    }
  }, [selected, scaleAnim]);

  useEffect(() => {
    if (correct !== null) {
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [correct, borderAnim]);

  let containerStyle: object[] = [styles.container];
  let prefixBg: object[] = [styles.prefixCircle];
  let prefixTextStyle: object[] = [styles.prefixText];
  let labelTextStyle: object[] = [styles.label];

  if (correct === true) {
    containerStyle = [...containerStyle, styles.correctContainer];
    prefixBg = [...prefixBg, styles.correctPrefixBg];
    prefixTextStyle = [...prefixTextStyle, styles.correctPrefixText];
  } else if (correct === false && selected) {
    containerStyle = [...containerStyle, styles.wrongContainer];
    prefixBg = [...prefixBg, styles.wrongPrefixBg];
    prefixTextStyle = [...prefixTextStyle, styles.wrongPrefixText];
  } else if (selected) {
    containerStyle = [...containerStyle, styles.selectedContainer];
    prefixBg = [...prefixBg, styles.selectedPrefixBg];
    prefixTextStyle = [...prefixTextStyle, styles.selectedPrefixText];
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          containerStyle,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={prefixBg}>
          <Text style={prefixTextStyle}>{LABELS[index]}</Text>
        </View>
        <Text style={labelTextStyle}>{label}</Text>
        {correct === true && (
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
        )}
        {correct === false && selected && (
          <Ionicons name="close-circle" size={20} color={colors.error} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.md,
    padding: spacing.base - 2,
    marginBottom: spacing.sm + 2,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  selectedContainer: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  correctContainer: {
    backgroundColor: colors.successContainer,
    borderColor: colors.success,
  },
  wrongContainer: {
    backgroundColor: colors.errorContainer,
    borderColor: colors.error,
  },
  prefixCircle: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  prefixText: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },
  selectedPrefixBg: {
    backgroundColor: colors.primaryContainer,
  },
  selectedPrefixText: {
    color: colors.primary,
  },
  correctPrefixBg: {
    backgroundColor: colors.successContainer,
  },
  correctPrefixText: {
    color: colors.success,
  },
  wrongPrefixBg: {
    backgroundColor: colors.errorContainer,
  },
  wrongPrefixText: {
    color: colors.error,
  },
  label: {
    flex: 1,
    ...typography.body,
    color: colors.onSurface,
  },
});
