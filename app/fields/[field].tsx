import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { concepts } from "../../src/data/concepts";
import ConceptCard from "../../src/components/ConceptCard";
import { initDatabase, getLearningRecords, getFavorites } from "../../src/lib/db";
import { getFieldColor, getFieldIcon } from "../../src/utils/concept";
import { colors, typography, spacing, radius } from "../../src/theme/tokens";

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
    <View style={styles.screen}>
      <View style={[styles.header, { backgroundColor: fieldColor + "0D" }]}>
        <View style={[styles.iconBg, { backgroundColor: fieldColor + "18" }]}>
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
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    paddingBottom: spacing.base,
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  icon: { fontSize: 26 },
  headerInfo: { flex: 1 },
  fieldName: {
    ...typography.headline,
  },
  count: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  list: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
});
