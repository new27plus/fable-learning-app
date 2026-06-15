import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { initDatabase, getFavorites } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import ConceptCard from "../src/components/ConceptCard";

export default function FavoritesScreen() {
  const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      initDatabase();
      const favs = getFavorites();
      setFavoriteIds(new Set(favs.map((f) => f.concept_id)));
    }, [])
  );

  const favoriteConcepts = concepts.filter((c) => favoriteIds.has(c.id));

  if (favoriteConcepts.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.emptyIconBg}>
          <Text style={styles.emptyIcon}>❤️</Text>
        </View>
        <Text style={styles.emptyText}>还没有收藏任何概念</Text>
        <Text style={styles.emptyHint}>在概念解释页点击收藏按钮即可</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteConcepts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConceptCard
            concept={item}
            isLearned={false}
            isFavorite={true}
            onPress={() => router.push(`/concept/${item.id}/story`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  list: { padding: 20 },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    padding: 40,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E17055" + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyIcon: { fontSize: 32 },
  emptyText: { fontSize: 18, fontWeight: "700", color: "#2D3436", marginBottom: 8 },
  emptyHint: { fontSize: 14, color: "#B2BEC3", textAlign: "center" },
});
