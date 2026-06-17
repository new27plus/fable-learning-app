import { StyleSheet } from "react-native";

/**
 * Design tokens — fusing Apple HIG clarity, Material 3 tonal system, HarmonyOS softness.
 */

// ─── Color Palette (Material 3 tonal approach + Apple semantic colors) ───

export const colors = {
  // Primary — warm terracotta
  primary: "#D4603A",
  primaryLight: "#F4A98A",
  primaryContainer: "#FDEEE8",
  onPrimary: "#FFFFFF",
  onPrimaryContainer: "#3D1508",

  // Secondary — muted sage
  secondary: "#5B8A72",
  secondaryLight: "#8FB8A2",
  secondaryContainer: "#E8F4ED",
  onSecondary: "#FFFFFF",
  onSecondaryContainer: "#0F2A1C",

  // Tertiary — soft violet
  tertiary: "#7B6BA6",
  tertiaryLight: "#A99BD4",
  tertiaryContainer: "#F0ECF8",
  onTertiary: "#FFFFFF",
  onTertiaryContainer: "#1D1535",

  // Accent — warm gold
  accent: "#C4953A",
  accentContainer: "#FBF3E0",
  onAccentContainer: "#3D2800",

  // Surface (HarmonyOS warm whites)
  surface: "#FEFCF9",
  surfaceDim: "#F5F0EA",
  surfaceBright: "#FFFFFF",
  surfaceContainerLow: "#FAF7F3",
  surfaceContainer: "#F3EDE6",
  surfaceContainerHigh: "#EDE6DD",
  onSurface: "#1C1B18",
  onSurfaceVariant: "#6B6660",

  // Error
  error: "#C93A2E",
  errorContainer: "#FDECE9",
  onError: "#FFFFFF",
  onErrorContainer: "#3B0A06",

  // Success
  success: "#2E8B57",
  successContainer: "#E6F5ED",

  // Info
  info: "#2D7ABF",
  infoContainer: "#E3F0FA",

  // Outline
  outline: "#C8C2B8",
  outlineVariant: "#E3DDD4",

  // Misc
  scrim: "rgba(0,0,0,0.32)",
  shadow: "rgba(28,27,24,0.08)",
} as const;

// ─── Field accent colors (vivid, Material 3-inspired) ───

export const fieldColors = {
  "经济学": "#D4603A",
  "心理学": "#7B6BA6",
  "管理学": "#2E8B57",
  "计算机科学": "#2D7ABF",
  "哲学": "#C4953A",
  "金融学": "#C9487A",
} as const;

// ─── Typography (Apple HIG scale + Material 3 roles) ───

export const typography = {
  displayLarge:  { fontSize: 34, fontWeight: "800" as const, lineHeight: 42, letterSpacing: 0.25 },
  displaySmall:  { fontSize: 28, fontWeight: "700" as const, lineHeight: 36, letterSpacing: 0 },
  headline:      { fontSize: 22, fontWeight: "700" as const, lineHeight: 30, letterSpacing: 0 },
  titleLarge:    { fontSize: 20, fontWeight: "600" as const, lineHeight: 28, letterSpacing: 0 },
  titleMedium:   { fontSize: 17, fontWeight: "600" as const, lineHeight: 24, letterSpacing: 0.15 },
  titleSmall:    { fontSize: 15, fontWeight: "600" as const, lineHeight: 22, letterSpacing: 0.1 },
  bodyLarge:     { fontSize: 17, fontWeight: "400" as const, lineHeight: 28, letterSpacing: 0.15 },
  body:          { fontSize: 15, fontWeight: "400" as const, lineHeight: 24, letterSpacing: 0.15 },
  bodySmall:     { fontSize: 13, fontWeight: "400" as const, lineHeight: 20, letterSpacing: 0.2 },
  labelLarge:    { fontSize: 15, fontWeight: "600" as const, lineHeight: 20, letterSpacing: 0.1 },
  labelMedium:   { fontSize: 13, fontWeight: "500" as const, lineHeight: 18, letterSpacing: 0.5 },
  labelSmall:    { fontSize: 11, fontWeight: "500" as const, lineHeight: 16, letterSpacing: 0.5 },
} as const;

// ─── Spacing (4px grid — Apple standard) ───

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
} as const;

// ─── Radius (HarmonyOS softness + Material 3 shapes) ───

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

// ─── Elevation / Shadows (Apple HIG layered depth) ───

const baseShadows = StyleSheet.create({
  none: {},
  sm: {
    shadowColor: "#1C1B18",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: "#1C1B18",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: "#1C1B18",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
});

export const shadows = {
  ...baseShadows,
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  }),
};

// ─── Shared component base styles ───

export const componentStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  screenContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  card: {
    backgroundColor: colors.surfaceBright,
    borderRadius: radius.lg,
    padding: spacing.base,
    ...shadows.md,
  },
  cardFlat: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.base,
  },
  sectionTitle: {
    ...typography.titleLarge,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.xs,
  },
  badgeText: {
    ...typography.labelMedium,
    color: colors.onPrimary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
  },
});
