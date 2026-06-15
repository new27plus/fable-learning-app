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
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={prefixBg}>
        <Text style={prefixTextStyle}>{LABELS[index]}</Text>
      </View>
      <Text style={labelTextStyle}>{label}</Text>
      {correct === true && <Text style={styles.checkIcon}>✓</Text>}
      {correct === false && selected && <Text style={styles.crossIcon}>✗</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
  },
  selectedContainer: {
    backgroundColor: "#EBF5FB",
    borderColor: "#74B9FF",
  },
  correctContainer: {
    backgroundColor: "#EAFAF1",
    borderColor: "#00B894",
  },
  wrongContainer: {
    backgroundColor: "#FDEDEC",
    borderColor: "#E17055",
  },
  prefixCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  prefixText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#636E72",
  },
  selectedPrefixBg: {
    backgroundColor: "#D6EAF8",
  },
  selectedPrefixText: {
    color: "#0984E3",
  },
  correctPrefixBg: {
    backgroundColor: "#D5F5E3",
  },
  correctPrefixText: {
    color: "#00B894",
  },
  wrongPrefixBg: {
    backgroundColor: "#FADBD8",
  },
  wrongPrefixText: {
    color: "#E17055",
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: "#2D3436",
    lineHeight: 22,
  },
  checkIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00B894",
    marginLeft: 8,
  },
  crossIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E17055",
    marginLeft: 8,
  },
});
