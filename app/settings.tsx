import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* App info */}
      <View style={styles.logoSection}>
        <View style={styles.logoBg}>
          <Text style={styles.logoEmoji}>📖</Text>
        </View>
        <Text style={styles.appName}>寓言学堂</Text>
        <Text style={styles.appDesc}>用故事理解复杂概念</Text>
      </View>

      {/* Info card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>当前版本</Text>
          <View style={styles.valueTag}>
            <Text style={styles.valueText}>MVP 离线版</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>数据存储</Text>
          <Text style={styles.value}>本地 SQLite</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>隐私说明</Text>
          <Text style={[styles.value, { flex: 1, textAlign: "right" }]}>
            当前版本不上传任何学习数据
          </Text>
        </View>
      </View>

      {/* Placeholder card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>即将推出</Text>
        {[
          { icon: "🤖", label: "AI 生成模式" },
          { icon: "🔑", label: "用户自带 API Key" },
          { icon: "☁️", label: "云端同步" },
        ].map((item, i) => (
          <View key={i}>
            {i > 0 && <View style={styles.divider} />}
            <View style={styles.placeholderRow}>
              <Text style={styles.placeholderIcon}>{item.icon}</Text>
              <Text style={styles.placeholderText}>{item.label}</Text>
              <View style={styles.comingSoonTag}>
                <Text style={styles.comingSoonText}>即将推出</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>寓言学堂 · V1.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },

  // Logo
  logoSection: { alignItems: "center", marginBottom: 28, marginTop: 8 },
  logoBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E17055" + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logoEmoji: { fontSize: 32 },
  appName: { fontSize: 22, fontWeight: "800", color: "#E17055" },
  appDesc: { fontSize: 14, color: "#B2BEC3", marginTop: 4 },

  // Cards
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
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
  valueTag: {
    backgroundColor: "#E17055" + "15",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  valueText: { fontSize: 13, fontWeight: "600", color: "#E17055" },
  divider: { height: 1, backgroundColor: "#F5F6FA" },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 8,
  },
  placeholderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  placeholderIcon: { fontSize: 18, marginRight: 10 },
  placeholderText: { fontSize: 14, color: "#636E72", flex: 1 },
  comingSoonTag: {
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  comingSoonText: { fontSize: 11, color: "#B2BEC3", fontWeight: "500" },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#B2BEC3",
    marginTop: 12,
  },
});
