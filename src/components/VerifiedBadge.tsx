import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../theme";

interface VerifiedBadgeProps {
  compact?: boolean;
}

export function VerifiedBadge({ compact }: VerifiedBadgeProps) {
  return (
    <View style={[styles.badge, compact && styles.compact]}>
      <Ionicons name="shield-checkmark" size={compact ? 13 : 15} color={colors.successDark} />
      <Text style={[styles.text, compact && styles.compactText]}>
        {compact ? "Verificado" : "Universitário verificado"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.successSoft,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  compact: {
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  text: {
    color: colors.successDark,
    fontSize: typography.small,
    fontWeight: "800",
  },
  compactText: {
    fontSize: typography.tiny,
  },
});
