import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>当前版本</Text>
          <Text style={styles.value}>MVP 离线版</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>数据存储</Text>
          <Text style={styles.value}>本地 SQLite</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>隐私说明</Text>
          <Text style={styles.value}>当前版本不上传任何学习数据</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>预留功能（未实现）</Text>
        <View style={styles.placeholderRow}>
          <Text style={styles.placeholderText}>🤖 AI 生成模式</Text>
          <Text style={styles.placeholderStatus}>即将推出</Text>
        </View>
        <View style={styles.placeholderRow}>
          <Text style={styles.placeholderText}>🔑 用户自带 API Key</Text>
          <Text style={styles.placeholderStatus}>即将推出</Text>
        </View>
        <View style={styles.placeholderRow}>
          <Text style={styles.placeholderText}>☁️ 云端同步</Text>
          <Text style={styles.placeholderStatus}>即将推出</Text>
        </View>
      </View>

      <Text style={styles.footer}>寓言学堂 · 用故事理解复杂概念</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: { fontSize: 15, color: "#2D3436", fontWeight: "600" },
  value: { fontSize: 14, color: "#636E72" },
  divider: { height: 1, backgroundColor: "#F0F0F0" },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 12,
  },
  placeholderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  placeholderText: { fontSize: 14, color: "#B2BEC3" },
  placeholderStatus: {
    fontSize: 12,
    color: "#B2BEC3",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#B2BEC3",
    marginTop: 20,
  },
});
