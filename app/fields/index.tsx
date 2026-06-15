import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FIELDS, FIELD_ICONS, FIELD_COLORS } from "../../src/utils/concept";
import { concepts } from "../../src/data/concepts";

export default function FieldsIndex() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {FIELDS.map((field) => {
        const count = concepts.filter((c) => c.field === field).length;
        return (
          <TouchableOpacity
            key={field}
            style={[styles.card, { borderLeftColor: FIELD_COLORS[field] }]}
            onPress={() => router.push(`/fields/${field}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{FIELD_ICONS[field]}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{field}</Text>
              <Text style={styles.count}>{count} 个概念</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  content: { padding: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: { fontSize: 28, marginRight: 14 },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700", color: "#2D3436" },
  count: { fontSize: 13, color: "#636E72", marginTop: 2 },
  arrow: { fontSize: 18, color: "#B2BEC3" },
});
