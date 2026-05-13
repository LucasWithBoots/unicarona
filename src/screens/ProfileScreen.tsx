import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "../components/PrimaryButton";
import { UserCard } from "../components/UserCard";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<Navigation>();
  const { currentUser } = useAppData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Dados simulados do estudante usado no protótipo.</Text>
        </View>

        <UserCard user={currentUser} subtitle={`${currentUser.course} • ${currentUser.shift}`}>
          <View style={styles.profileBadgeRow}>
            <VerifiedBadge />
          </View>
        </UserCard>

        <View style={styles.stats}>
          <Stat icon="star-outline" label="Avaliação" value={currentUser.rating.toFixed(1)} />
          <Stat icon="car-sport-outline" label="Viagens" value={`${currentUser.trips}`} />
          <Stat icon="shield-checkmark-outline" label="Status" value="Verificado" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informações acadêmicas</Text>
          <Info label="Universidade" value={currentUser.university} />
          <Info label="Campus" value={currentUser.campus} />
          <Info label="Curso" value={currentUser.course} />
          <Info label="E-mail" value={currentUser.email} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferências de segurança</Text>
          <Preference title="Contato de confiança" value="Configurado" />
          <Preference title="Compartilhar rota automaticamente" value="Ativo" />
          <Preference title="Receber alertas noturnos" value="Ativo" />
        </View>

        <TouchableOpacity activeOpacity={0.84} style={styles.supportCard}>
          <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
          <View style={styles.supportText}>
            <Text style={styles.supportTitle}>Central de suporte</Text>
            <Text style={styles.supportSubtitle}>FAQ, denúncias e orientações de uso seguro.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.subtle} />
        </TouchableOpacity>

        <PrimaryButton
          title="Sair do protótipo"
          icon="log-out-outline"
          variant="outline"
          onPress={() => navigation.navigate("Welcome")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Preference({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.preferenceRow}>
      <View style={styles.preferenceIcon}>
        <Ionicons name="checkmark" size={16} color={colors.successDark} />
      </View>
      <Text style={styles.preferenceTitle}>{title}</Text>
      <Text style={styles.preferenceValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 23,
  },
  profileBadgeRow: {
    alignItems: "flex-start",
  },
  stats: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  stat: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  statValue: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: "800",
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  infoRow: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.xs,
    paddingTop: spacing.md,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: "800",
  },
  infoValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "800",
  },
  preferenceRow: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  preferenceIcon: {
    alignItems: "center",
    backgroundColor: colors.successSoft,
    borderRadius: radius.pill,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  preferenceTitle: {
    color: colors.text,
    flex: 1,
    fontSize: typography.small,
    fontWeight: "800",
  },
  preferenceValue: {
    color: colors.successDark,
    fontSize: typography.small,
    fontWeight: "900",
  },
  supportCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  supportText: {
    flex: 1,
    gap: spacing.xs,
  },
  supportTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  supportSubtitle: {
    color: colors.muted,
    fontSize: typography.small,
  },
});
