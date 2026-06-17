import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { initDatabase, getFavorites } from "../src/lib/db";
import { concepts } from "../src/data/concepts";
import ConceptCard from "../src/components/ConceptCard";
import { colors, typography, spacing, radius } from "../src/theme/tokens";

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
    <View style={styles.screen}>
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
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: { padding: spacing.lg },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.xxxl,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.errorContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.base,
  },
  emptyIcon: { fontSize: 32 },
  emptyText: {
    ...typography.titleMedium,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  emptyHint: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
});
