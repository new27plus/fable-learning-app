import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { useEffect } from "react";
import { initDatabase } from "../src/lib/db";
import { colors, typography } from "../src/theme/tokens";

const isWeb = Platform.OS === "web";

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.onSurface,
          headerTitleStyle: {
            ...typography.titleMedium,
            color: colors.onSurface,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.surface },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="fields/index" options={{ title: "选择学科" }} />
        <Stack.Screen name="fields/[field]" options={{ title: "概念列表" }} />
        <Stack.Screen name="concept/[id]/story" options={{ title: "寓言故事" }} />
        <Stack.Screen name="concept/[id]/explanation" options={{ title: "概念解读" }} />
        <Stack.Screen name="concept/[id]/quiz" options={{ title: "小测验" }} />

        {/* Hide personal routes on web */}
        {!isWeb && (
          <>
            <Stack.Screen name="favorites" options={{ title: "我的收藏" }} />
            <Stack.Screen name="records" options={{ title: "学习记录" }} />
            <Stack.Screen name="wrong-answers" options={{ title: "错题本" }} />
            <Stack.Screen name="settings" options={{ title: "设置" }} />
          </>
        )}
      </Stack>
    </>
  );
}
