import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAppData } from "../context/AppDataContext";
import { colors, radius, spacing, typography, wideLayout } from "../theme";
import { BrandCar } from "./BrandCar";
import { VerifiedBadge } from "./VerifiedBadge";

export interface SidebarItem {
  active: keyof typeof Ionicons.glyphMap;
  inactive: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface DesktopSidebarProps extends BottomTabBarProps {
  items: Record<string, SidebarItem>;
}

// Substitui a barra de abas inferior no layout de desktop.
export function DesktopSidebar({ state, navigation, items }: DesktopSidebarProps) {
  const { currentUser } = useAppData();

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}>
          <BrandCar size={24} />
        </View>
        <Text style={styles.brand}>UniCarona</Text>
      </View>

      <View style={styles.nav}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const item = items[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={() => {
                const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
              style={[styles.item, focused && styles.itemActive]}
            >
              <Ionicons
                name={focused ? item.active : item.inactive}
                size={21}
                color={focused ? colors.primary : colors.muted}
              />
              <Text style={[styles.itemText, focused && styles.itemTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{currentUser.avatarInitials}</Text>
        </View>
        <View style={styles.userCopy}>
          <Text numberOfLines={1} style={styles.userName}>{currentUser.name}</Text>
          <VerifiedBadge compact />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: colors.surface,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    gap: spacing.xxl,
    padding: spacing.xl,
    width: wideLayout.sidebar,
  },
  brandRow: { alignItems: "center", flexDirection: "row", gap: spacing.md, paddingHorizontal: spacing.xs },
  brandIcon: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 13,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  brand: { color: colors.text, fontSize: typography.subtitle, fontWeight: "900", letterSpacing: -0.4 },
  nav: { flex: 1, gap: spacing.xs },
  item: {
    alignItems: "center",
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 48,
    paddingHorizontal: spacing.lg,
  },
  itemActive: { backgroundColor: colors.primarySoft },
  itemText: { color: colors.muted, fontSize: 15, fontWeight: "800" },
  itemTextActive: { color: colors.primary },
  userCard: {
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  avatarText: { color: colors.surface, fontWeight: "900" },
  userCopy: { flex: 1, gap: 4 },
  userName: { color: colors.text, fontSize: 14, fontWeight: "900" },
});
