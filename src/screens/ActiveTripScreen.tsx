import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { PrimaryButton } from "../components/PrimaryButton";
import { UserCard } from "../components/UserCard";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveTrip">;

export function ActiveTripScreen({ navigation, route }: Props) {
  const { getRideById, getUserById, rides } = useAppData();
  const ride = route.params?.rideId ? getRideById(route.params.rideId) : rides[0];
  const driver = ride ? getUserById(ride.driverId) : undefined;

  if (!ride || !driver) {
    return (
      <View style={styles.empty}>
        <Text style={styles.title}>Viagem indisponível</Text>
        <PrimaryButton title="Voltar" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Viagem em andamento</Text>
        <Text style={styles.route}>{ride.origin} → {ride.destination}</Text>
        <Text style={styles.meta}>Previsão de chegada: 18 min • {ride.seats} vagas no veículo</Text>
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapLine} />
          <View style={styles.mapPointStart} />
          <View style={styles.mapPointEnd} />
          <Ionicons name="car-sport" size={28} color={colors.primary} style={styles.carIcon} />
        </View>
      </View>

      <UserCard user={driver} subtitle={`${driver.university} • ${driver.trips} viagens concluídas`} />

      <View style={styles.quickActions}>
        <SafetyQuick
          title="Compartilhar rota"
          icon="share-social-outline"
          onPress={() => Alert.alert("Rota compartilhada", "Seu contato de confiança recebeu a rota da viagem.")}
        />
        <SafetyQuick
          title="Emergência"
          icon="alert-circle-outline"
          danger
          onPress={() => Alert.alert("Emergência acionada", "Contato de confiança e suporte foram notificados.")}
        />
        <SafetyQuick
          title="Denunciar"
          icon="flag-outline"
          onPress={() => Alert.alert("Denúncia registrada", "Seu relato foi recebido para análise.")}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Checklist de segurança</Text>
        <Text style={styles.bodyText}>Motorista verificado, rota visível e botão de emergência disponíveis durante a viagem.</Text>
      </View>

      <PrimaryButton
        title="Finalizar viagem e avaliar"
        icon="star-outline"
        onPress={() => navigation.navigate("TripReview", { rideId: ride.id })}
      />
    </ScrollView>
  );
}

function SafetyQuick({
  title,
  icon,
  danger,
  onPress,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={styles.quickAction}>
      <Ionicons name={icon} size={24} color={danger ? colors.danger : colors.primary} />
      <Text style={[styles.quickText, danger && styles.quickDanger]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  empty: {
    alignItems: "center",
    flex: 1,
    gap: spacing.lg,
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  statusLabel: {
    color: colors.successDark,
    fontSize: typography.small,
    fontWeight: "900",
  },
  route: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
  },
  mapPlaceholder: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    height: 160,
    marginTop: spacing.sm,
    overflow: "hidden",
  },
  mapLine: {
    backgroundColor: colors.primarySoft,
    height: 6,
    left: 34,
    position: "absolute",
    right: 34,
    top: 78,
  },
  mapPointStart: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 20,
    left: 28,
    position: "absolute",
    top: 71,
    width: 20,
  },
  mapPointEnd: {
    backgroundColor: colors.success,
    borderRadius: radius.pill,
    height: 20,
    position: "absolute",
    right: 28,
    top: 71,
    width: 20,
  },
  carIcon: {
    left: "48%",
    position: "absolute",
    top: 64,
  },
  quickActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  quickAction: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing.sm,
    minHeight: 94,
    justifyContent: "center",
    padding: spacing.sm,
  },
  quickText: {
    color: colors.primary,
    fontSize: typography.tiny,
    fontWeight: "900",
    textAlign: "center",
  },
  quickDanger: {
    color: colors.danger,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  bodyText: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 23,
  },
});
