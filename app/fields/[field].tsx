import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { concepts } from "../../src/data/concepts";
import ConceptCard from "../../src/components/ConceptCard";
import { initDatabase, getLearningRecords, getFavorites } from "../../src/lib/db";
import { getFieldColor, getFieldIcon } from "../../src/utils/concept";
import { colors, typography, spacing, radius, shadows } from "../../src/theme/tokens";

const isWeb = Platform.OS === "web";

export default function FieldList() {
  const { field } = useLocalSearchParams<{ field: string }>();
  const router = useRouter();
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const fieldConcepts = concepts.filter((c) => c.field === field);
  const fieldColor = getFieldColor(field || "");
  const fieldIcon = getFieldIcon(field || "");

  useEffect(() => {
    if (!isWeb) {
      initDatabase();
      const records = getLearningRecords();
      setLearnedIds(new Set(records.map((r) => r.concept_id)));
      const favs = getFavorites();
      setFavoriteIds(new Set(favs.map((f) => f.concept_id)));
    }
  }, []);

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { backgroundColor: fieldColor + "0D" }]}>
        <View style={styles.headerContent}>
          <View style={[styles.iconBg, { backgroundColor: fieldColor + "18" }]}>
            <Text style={styles.icon}>{fieldIcon}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.fieldName, { color: fieldColor }]}>{field}</Text>
            <Text style={styles.count}>{fieldConcepts.length} 个概念</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={fieldConcepts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConceptCard
            concept={item}
            isLearned={isWeb ? false : learnedIds.has(item.id)}
            isFavorite={isWeb ? false : favoriteIds.has(item.id)}
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
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  iconBg: {
    width: 60,
    height: 60,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.lg,
  },
  icon: { fontSize: 30 },
  headerInfo: { flex: 1 },
  fieldName: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: "700",
  },
  count: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  list: {
    padding: spacing.lg,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
});
