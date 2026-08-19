import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled,
  loading,
  style,
}: PrimaryButtonProps) {
  const isOutline = variant === "outline" || variant === "ghost";
  const backgroundColor =
    variant === "secondary"
      ? colors.success
      : variant === "danger"
        ? colors.danger
        : isOutline
          ? "transparent"
          : colors.primary;
  const textColor =
    variant === "outline"
      ? colors.primary
      : variant === "ghost"
        ? colors.muted
        : colors.surface;

  return (
    <TouchableOpacity
      activeOpacity={0.84}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor: variant === "outline" ? colors.primary : "transparent",
          opacity: disabled ? 0.55 : 1,
          ...(variant === "primary" ? shadows.floating : {}),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={20} color={textColor} /> : null}
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.body,
    fontWeight: "800",
  },
});
