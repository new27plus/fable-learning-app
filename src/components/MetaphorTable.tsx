import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#E17055",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerCell: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  evenRow: {
    backgroundColor: "#FFFFFF",
  },
  oddRow: {
    backgroundColor: "#FFF8F0",
  },
  cell: {
    fontSize: 13,
    color: "#2D3436",
    lineHeight: 19,
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
    fontSize: 13,
    fontWeight: "600",
    color: "#E17055",
    lineHeight: 19,
  },
});
