import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, typography, spacing, radius, shadows } from "../theme/tokens";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

export default function PrimaryButton({ title, onPress, variant = "primary", disabled }: Props) {
  const buttonStyle = [
    styles.button,
    variant === "primary" && styles.primary,
    variant === "secondary" && styles.secondary,
    variant === "outline" && styles.outline,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    variant === "primary" && styles.primaryText,
    variant === "secondary" && styles.secondaryText,
    variant === "outline" && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.glow(colors.primary),
  },
  secondary: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    ...typography.labelLarge,
  },
  primaryText: {
    color: colors.onPrimary,
  },
  secondaryText: {
    color: colors.onSurface,
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    opacity: 0.7,
  },
});
