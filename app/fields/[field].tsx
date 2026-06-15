import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../src/data/concepts";
import ConceptCard from "../../src/components/ConceptCard";
import { initDatabase, getLearningRecords, getFavorites } from "../../src/lib/db";
import { getFieldColor, getFieldIcon } from "../../src/utils/concept";

export default function FieldList() {
  const { field } = useLocalSearchParams<{ field: string }>();
  const router = useRouter();
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const fieldConcepts = concepts.filter((c) => c.field === field);
  const fieldColor = getFieldColor(field || "");
  const fieldIcon = getFieldIcon(field || "");

  useEffect(() => {
    initDatabase();
    const records = getLearningRecords();
    setLearnedIds(new Set(records.map((r) => r.concept_id)));
    const favs = getFavorites();
    setFavoriteIds(new Set(favs.map((f) => f.concept_id)));
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: fieldColor + "10" }]}>
        <View style={[styles.iconBg, { backgroundColor: fieldColor + "20" }]}>
          <Text style={styles.icon}>{fieldIcon}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.fieldName, { color: fieldColor }]}>{field}</Text>
          <Text style={styles.count}>{fieldConcepts.length} 个概念</Text>
        </View>
      </View>
      <FlatList
        data={fieldConcepts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConceptCard
            concept={item}
            isLearned={learnedIds.has(item.id)}
            isFavorite={favoriteIds.has(item.id)}
            onPress={() => router.push(`/concept/${item.id}/story`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  icon: { fontSize: 26 },
  headerInfo: { flex: 1 },
  fieldName: { fontSize: 22, fontWeight: "800" },
  count: { fontSize: 13, color: "#B2BEC3", marginTop: 2 },
  list: { padding: 20, paddingTop: 8 },
});
