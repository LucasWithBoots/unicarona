import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../theme";

interface SafetyActionCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: "primary" | "success" | "danger" | "warning";
  onPress: () => void;
}

export function SafetyActionCard({
  title,
  description,
  icon,
  tone = "primary",
  onPress,
}: SafetyActionCardProps) {
  const toneColor =
    tone === "success"
      ? colors.success
      : tone === "danger"
        ? colors.danger
        : tone === "warning"
          ? colors.warning
          : colors.primary;
  const softColor =
    tone === "success"
      ? colors.successSoft
      : tone === "danger"
        ? colors.dangerSoft
        : tone === "warning"
          ? colors.warningSoft
          : colors.primarySoft;

  return (
    <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: softColor }]}>
        <Ionicons name={icon} size={24} color={toneColor} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.subtle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 0,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  iconBox: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  textBox: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  description: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 18,
  },
});
