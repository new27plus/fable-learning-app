import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
  let containerStyle: object[] = [styles.container];
  let labelStyle: object[] = [styles.optionLabel];
  let prefixStyle: object[] = [styles.prefix];

  if (correct === true) {
    containerStyle = [...containerStyle, styles.correctContainer];
    prefixStyle = [...prefixStyle, styles.correctPrefix];
  } else if (correct === false && selected) {
    containerStyle = [...containerStyle, styles.wrongContainer];
    prefixStyle = [...prefixStyle, styles.wrongPrefix];
  } else if (selected) {
    containerStyle = [...containerStyle, styles.selectedContainer];
    prefixStyle = [...prefixStyle, styles.selectedPrefix];
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.prefixContainer}>
        <Text style={prefixStyle}>{LABELS[index]}</Text>
      </View>
      <Text style={labelStyle}>{label}</Text>
      {correct === true && <Text style={styles.icon}>✓</Text>}
      {correct === false && selected && <Text style={[styles.icon, styles.wrongIcon]}>✗</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#DFE6E9",
  },
  selectedContainer: {
    backgroundColor: "#D6EAF8",
    borderColor: "#74B9FF",
  },
  correctContainer: {
    backgroundColor: "#D5F5E3",
    borderColor: "#00B894",
  },
  wrongContainer: {
    backgroundColor: "#FADBD8",
    borderColor: "#E17055",
  },
  prefixContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  prefix: {
    fontSize: 14,
    fontWeight: "700",
    color: "#636E72",
  },
  selectedPrefix: {
    color: "#0984E3",
  },
  correctPrefix: {
    color: "#00B894",
    backgroundColor: "#D5F5E3",
  },
  wrongPrefix: {
    color: "#E17055",
    backgroundColor: "#FADBD8",
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    color: "#2D3436",
    lineHeight: 22,
  },
  icon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00B894",
    marginLeft: 8,
  },
  wrongIcon: {
    color: "#E17055",
  },
});
