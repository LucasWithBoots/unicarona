import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../theme";
import { User } from "../types";
import { RatingStars } from "./RatingStars";
import { VerifiedBadge } from "./VerifiedBadge";

interface UserCardProps {
  user: User;
  subtitle?: string;
  rightContent?: ReactNode;
  children?: ReactNode;
}

export function UserCard({ user, subtitle, rightContent, children }: UserCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.avatarInitials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>{subtitle ?? `${user.course} • ${user.campus}`}</Text>
          <View style={styles.trustRow}>
            <RatingStars rating={user.rating} size={14} />
            {user.verified ? <VerifiedBadge compact /> : null}
          </View>
        </View>
        {rightContent}
      </View>
      {children ? <View style={styles.children}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 0,
    padding: spacing.lg,
    ...shadows.card,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  avatarText: {
    color: colors.primaryDark,
    fontSize: typography.body,
    fontWeight: "900",
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.small,
  },
  trustRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  children: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
});
