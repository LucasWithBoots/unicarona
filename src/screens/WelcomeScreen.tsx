import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandCar } from "../components/BrandCar";
import { useWideLayout } from "../hooks/useWideLayout";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const palette = {
  purple: "#6D55F7",
  purpleDark: "#2F245F",
  lavender: "#E9E3FF",
  lilac: "#F5F2FF",
  white: "#FFFFFF",
  ink: "#19162B",
  muted: "#6F6A82",
  mint: "#DDF7EB",
  coral: "#FFE6DF",
};

export function WelcomeScreen({ navigation }: Props) {
  const wide = useWideLayout();

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.statusArea} />
      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <View style={[styles.container, wide && styles.containerWide]}>
          <View style={[styles.hero, wide && styles.heroWide]}>
            <View style={[styles.orbit, styles.orbitLarge]} />
            <View style={[styles.orbit, styles.orbitSmall]} />

            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <BrandCar size={26} />
              </View>
              <Text style={styles.brand}>UniCarona</Text>
            </View>

            <View style={[styles.illustration, wide && styles.illustrationWide]}>
              <View style={styles.roadLine} />
              <View style={[styles.carBubble, wide && styles.carBubbleWide]}>
                <BrandCar size={wide ? 128 : 88} />
              </View>
              <View style={[styles.floatingBadge, styles.badgeLeft]}>
                <Ionicons name="shield-checkmark" size={18} color="#277A5A" />
                <Text style={styles.floatingText}>Verificado</Text>
              </View>
              <View style={[styles.floatingBadge, styles.badgeRight]}>
                <Ionicons name="people" size={18} color="#B04C36" />
                <Text style={styles.floatingText}>Comunidade</Text>
              </View>
            </View>
          </View>

          <View style={[styles.content, wide && styles.contentWide]}>
            <View style={styles.copy}>
              <Text style={styles.eyebrow}>CARONAS UNIVERSITÁRIAS</Text>
              <Text style={[styles.title, wide && styles.titleWide]}>
                Seu caminho fica melhor quando é compartilhado.
              </Text>
              <Text style={[styles.subtitle, wide && styles.subtitleWide]}>
                Encontre estudantes verificados, combine rotas e chegue ao
                campus com mais tranquilidade.
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                activeOpacity={0.86}
                onPress={() => navigation.navigate("Register")}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>
                  Criar conta universitária
                </Text>
                <View style={styles.buttonIcon}>
                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={palette.purple}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.78}
                onPress={() => navigation.navigate("Login")}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryText}>Já tenho uma conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: palette.lilac, flex: 1 },
  statusArea: { backgroundColor: palette.purple },
  safeArea: { backgroundColor: palette.lilac, flex: 1 },
  container: { flex: 1 },
  containerWide: { flexDirection: "row" },
  hero: {
    backgroundColor: palette.purple,
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
    minHeight: "48%",
    overflow: "hidden",
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  heroWide: {
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    flex: 1.1,
    minHeight: "100%",
    paddingBottom: 48,
    paddingHorizontal: 56,
    paddingTop: 48,
  },
  orbit: {
    borderColor: "rgba(255,255,255,0.13)",
    borderRadius: 999,
    borderWidth: 26,
    position: "absolute",
  },
  orbitLarge: { height: 270, right: -92, top: -82, width: 270 },
  orbitSmall: { bottom: -46, height: 150, left: -60, width: 150 },
  brandRow: { alignItems: "center", flexDirection: "row", gap: 10 },
  brandIcon: {
    alignItems: "center",
    backgroundColor: palette.purple,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 14,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  brand: {
    color: palette.white,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  illustration: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 245,
  },
  illustrationWide: { alignSelf: "center", marginVertical: "auto", maxHeight: 460, width: 520 },
  roadLine: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    height: 12,
    position: "absolute",
    top: "57%",
    transform: [{ rotate: "-8deg" }],
    width: "130%",
  },
  carBubble: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderColor: "rgba(255,255,255,0.34)",
    borderRadius: 44,
    borderWidth: 1,
    height: 154,
    justifyContent: "center",
    transform: [{ rotate: "-4deg" }],
    width: 196,
  },
  carBubbleWide: { borderRadius: 60, height: 230, width: 290 },
  floatingBadge: {
    alignItems: "center",
    borderRadius: 18,
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: "absolute",
    shadowColor: "#271B62",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  badgeLeft: { backgroundColor: palette.mint, bottom: 32, left: 4 },
  badgeRight: { backgroundColor: palette.coral, right: 0, top: 42 },
  floatingText: { color: palette.ink, fontSize: 12, fontWeight: "800" },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    paddingTop: 26,
  },
  contentWide: {
    flex: 1,
    gap: 40,
    justifyContent: "center",
    marginHorizontal: "auto",
    maxWidth: 560,
    padding: 64,
  },
  copy: { gap: 10 },
  eyebrow: {
    color: palette.purple,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  title: {
    color: palette.ink,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
    lineHeight: 34,
  },
  titleWide: { fontSize: 46, letterSpacing: -1.6, lineHeight: 50 },
  subtitle: { color: palette.muted, fontSize: 15, lineHeight: 21 },
  subtitleWide: { fontSize: 18, lineHeight: 27 },
  actions: { gap: 9, paddingTop: 18 },
  primaryButton: {
    alignItems: "center",
    backgroundColor: palette.purple,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 58,
    paddingLeft: 20,
    paddingRight: 8,
    shadowColor: palette.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
  },
  primaryButtonText: { color: palette.white, fontSize: 15, fontWeight: "800" },
  buttonIcon: {
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: 15,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
  },
  secondaryText: { color: palette.purpleDark, fontSize: 14, fontWeight: "800" },
});
