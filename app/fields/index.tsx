import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../../src/utils/concept";
import { concepts } from "../../src/data/concepts";

export default function FieldsIndex() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>选择你感兴趣的学科</Text>
      <Text style={styles.headerDesc}>每个学科都有精心编写的寓言故事</Text>
      {FIELDS.map((field) => {
        const count = concepts.filter((c) => c.field === field).length;
        return (
          <TouchableOpacity
            key={field}
            style={styles.card}
            onPress={() => router.push(`/fields/${field}`)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBg, { backgroundColor: FIELD_COLORS[field] + "18" }]}>
              <Text style={styles.icon}>{FIELD_ICONS[field]}</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: FIELD_COLORS[field] }]}>{field}</Text>
              <Text style={styles.count}>{count} 个概念</Text>
            </View>
            <View style={[styles.arrowBg, { backgroundColor: FIELD_COLORS[field] + "12" }]}>
              <Text style={[styles.arrow, { color: FIELD_COLORS[field] }]}>›</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 20 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 4,
  },
  headerDesc: {
    fontSize: 14,
    color: "#B2BEC3",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700" },
  count: { fontSize: 13, color: "#B2BEC3", marginTop: 2 },
  arrowBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: { fontSize: 20, fontWeight: "300" },
});
