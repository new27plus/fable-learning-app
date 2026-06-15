import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../src/data/concepts";
import ConceptCard from "../../src/components/ConceptCard";
import { initDatabase, getLearningRecords, getFavorites } from "../../src/lib/db";

export default function FieldList() {
  const { field } = useLocalSearchParams<{ field: string }>();
  const router = useRouter();
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const fieldConcepts = concepts.filter((c) => c.field === field);

  useEffect(() => {
    initDatabase();
    const records = getLearningRecords();
    setLearnedIds(new Set(records.map((r) => r.concept_id)));
    const favs = getFavorites();
    setFavoriteIds(new Set(favs.map((f) => f.concept_id)));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fieldName}>{field}</Text>
        <Text style={styles.count}>{fieldConcepts.length} 个概念</Text>
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
    padding: 20,
    paddingBottom: 8,
  },
  fieldName: { fontSize: 22, fontWeight: "800", color: "#2D3436" },
  count: { fontSize: 13, color: "#636E72", marginTop: 4 },
  list: { padding: 20, paddingTop: 8 },
});
