import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing, radius } from "../theme/tokens";

interface Metaphor {
  fableElement: string;
  theoryElement: string;
  reason: string;
}

interface Props {
  data: Metaphor[];
}

export default function MetaphorTable({ data }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.col1]}>故事元素</Text>
        <Text style={[styles.headerCell, styles.col2]}>理论概念</Text>
        <Text style={[styles.headerCell, styles.col3]}>对应关系</Text>
      </View>
      {data.map((item, index) => (
        <View
          key={index}
          style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >
          <Text style={[styles.cell, styles.col1]}>{item.fableElement}</Text>
          <View style={[styles.col2]}>
            <Text style={styles.theoryCell}>{item.theoryElement}</Text>
          </View>
          <Text style={[styles.cell, styles.col3]}>{item.reason}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceBright,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm + 2,
  },
  headerCell: {
    ...typography.labelMedium,
    color: colors.onPrimary,
  },
  row: {
    flexDirection: "row",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm + 2,
  },
  evenRow: {
    backgroundColor: colors.surfaceBright,
  },
  oddRow: {
    backgroundColor: colors.surfaceContainerLow,
  },
  cell: {
    ...typography.bodySmall,
    color: colors.onSurface,
    lineHeight: 20,
  },
  col1: {
    flex: 2,
  },
  col2: {
    flex: 2,
  },
  col3: {
    flex: 3,
  },
  theoryCell: {
    ...typography.bodySmall,
    fontWeight: "600",
    color: colors.primary,
    lineHeight: 20,
  },
});
