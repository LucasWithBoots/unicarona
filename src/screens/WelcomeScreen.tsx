import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "../components/PrimaryButton";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>UC</Text>
          </View>
          <Text style={styles.title}>UniCarona</Text>
          <Text style={styles.subtitle}>
            Caronas universitárias com verificação, segurança e organização para a rotina acadêmica.
          </Text>
        </View>

        <View style={styles.trustPanel}>
          <VerifiedBadge />
          <View style={styles.trustGrid}>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
              <Text style={styles.trustText}>Perfil acadêmico validado</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons name="location-outline" size={22} color={colors.success} />
              <Text style={styles.trustText}>Rota compartilhável</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons name="star-outline" size={22} color={colors.warning} />
              <Text style={styles.trustText}>Avaliações da comunidade</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title="Entrar" icon="log-in-outline" onPress={() => navigation.navigate("Login")} />
          <PrimaryButton
            title="Criar conta universitária"
            icon="school-outline"
            variant="outline"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: spacing.xl,
  },
  hero: {
    alignItems: "flex-start",
    gap: spacing.md,
    paddingTop: spacing.xxl,
  },
  logo: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    height: 74,
    justifyContent: "center",
    width: 74,
  },
  logoText: {
    color: colors.surface,
    fontSize: 26,
    fontWeight: "900",
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 24,
  },
  trustPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  trustGrid: {
    gap: spacing.md,
  },
  trustItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  trustText: {
    color: colors.text,
    flex: 1,
    fontSize: typography.body,
    fontWeight: "700",
  },
  actions: {
    gap: spacing.md,
  },
});
