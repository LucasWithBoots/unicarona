import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useWideLayout } from "../hooks/useWideLayout";
import { colors, radius, spacing } from "../theme";
import { BrandCar } from "./BrandCar";

// No desktop, mostra a marca à esquerda e a tela (login, cadastro...) à direita.
export function AuthLayout({ children }: { children: ReactNode }) {
  const wide = useWideLayout();

  if (!wide) return children;

  return (
    <View style={styles.root}>
      <View style={styles.brandPanel}>
        <View style={[styles.orbit, styles.orbitLarge]} />
        <View style={[styles.orbit, styles.orbitSmall]} />

        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <BrandCar size={26} />
          </View>
          <Text style={styles.brand}>UniCarona</Text>
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>Caronas entre universitários, com mais segurança.</Text>
          <Text style={styles.subtitle}>
            Encontre estudantes verificados, combine rotas e chegue ao campus com mais tranquilidade.
          </Text>
          <View style={styles.badges}>
            <Badge icon="shield-checkmark" label="Perfis verificados" />
            <Badge icon="people" label="Comunidade universitária" />
            <Badge icon="navigate" label="Rota compartilhada" />
          </View>
        </View>
      </View>

      <View style={styles.formPanel}>
        <View style={styles.formColumn}>{children}</View>
      </View>
    </View>
  );
}

function Badge({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.badge}>
      <Ionicons name={icon} size={16} color={colors.surface} />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.background, flex: 1, flexDirection: "row" },
  brandPanel: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 48,
    borderTopRightRadius: 48,
    flex: 1,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: 56,
  },
  orbit: {
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    borderWidth: 34,
    position: "absolute",
  },
  orbitLarge: { height: 460, right: -150, top: -140, width: 460 },
  orbitSmall: { bottom: -110, height: 280, left: -110, width: 280 },
  brandRow: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  brandIcon: {
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 14,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  brand: { color: colors.surface, fontSize: 22, fontWeight: "900", letterSpacing: -0.4 },
  copy: { gap: spacing.lg, maxWidth: 520 },
  title: { color: colors.surface, fontSize: 44, fontWeight: "900", letterSpacing: -1.4, lineHeight: 48 },
  subtitle: { color: "rgba(255,255,255,0.8)", fontSize: 17, lineHeight: 26 },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm },
  badge: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.24)",
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  badgeText: { color: colors.surface, fontSize: 13, fontWeight: "800" },
  formPanel: { alignItems: "center", flex: 1 },
  formColumn: { flex: 1, maxWidth: 520, width: "100%" },
});
