import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../theme";
import { Ride, User } from "../types";
import { RatingStars } from "./RatingStars";
import { VerifiedBadge } from "./VerifiedBadge";

interface RideCardProps {
  ride: Ride;
  driver?: User;
  onPress: () => void;
  actionLabel?: string;
}

export function RideCard({ ride, driver, onPress, actionLabel = "Ver detalhes" }: RideCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.route}>
          <Text style={styles.origin}>{ride.origin}</Text>
          <Ionicons name="arrow-down" size={16} color={colors.primary} />
          <Text style={styles.destination}>{ride.destination}</Text>
        </View>
        <View style={styles.pricePill}>
          <Text style={styles.price}>{ride.suggestedPrice}</Text>
        </View>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{ride.time}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{ride.seats} vagas</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="school-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{ride.campus}</Text>
        </View>
      </View>

      {driver ? (
        <View style={styles.driverRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{driver.avatarInitials}</Text>
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <RatingStars rating={driver.rating} size={14} />
          </View>
          {driver.verified ? <VerifiedBadge compact /> : null}
        </View>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{ride.date} • {ride.recurrence}</Text>
        <View style={styles.action}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 0,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  route: {
    flex: 1,
    gap: 2,
  },
  origin: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "700",
  },
  destination: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "800",
  },
  pricePill: {
    backgroundColor: colors.successSoft,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  price: {
    color: colors.successDark,
    fontSize: typography.small,
    fontWeight: "900",
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  metaItem: {
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
  },
  metaText: {
    color: colors.primaryDark,
    fontSize: typography.small,
    fontWeight: "700",
  },
  driverRow: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  avatarText: {
    color: colors.primaryDark,
    fontWeight: "900",
  },
  driverInfo: {
    flex: 1,
    gap: 2,
  },
  driverName: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "800",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    color: colors.muted,
    flex: 1,
    fontSize: typography.small,
  },
  action: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  actionText: {
    color: colors.primary,
    fontSize: typography.small,
    fontWeight: "800",
  },
});
