import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../components/PrimaryButton";
import { RatingStars } from "../components/RatingStars";
import { UserCard } from "../components/UserCard";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "RideDetails">;

export function RideDetailsScreen({ navigation, route }: Props) {
  const { getRideById, getUserById, requestRide, requestedRideIds } = useAppData();
  const ride = getRideById(route.params.rideId);
  const driver = ride ? getUserById(ride.driverId) : undefined;
  const alreadyRequested = ride ? requestedRideIds.includes(ride.id) : false;

  if (!ride || !driver) {
    return (
      <View style={styles.empty}>
        <Text style={styles.title}>Carona não encontrada</Text>
        <PrimaryButton title="Voltar" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.label}>Rota</Text>
        <Text style={styles.routeTitle}>{ride.origin}</Text>
        <Ionicons name="arrow-down" size={18} color={colors.primary} />
        <Text style={styles.routeTitle}>{ride.destination}</Text>
        <RoutePreview />
      </View>

      <UserCard user={driver} subtitle={`${driver.university} • ${driver.campus}`}>
        <View style={styles.driverStats}>
          <Stat label="Avaliação" value={driver.rating.toFixed(1)} />
          <Stat label="Viagens" value={`${driver.trips}`} />
          <Stat label="Turno" value={driver.shift} />
        </View>
      </UserCard>

      <View style={styles.detailsGrid}>
        <Detail icon="location-outline" label="Ponto de encontro" value={ride.meetingPoint} />
        <Detail icon="time-outline" label="Horário" value={`${ride.date}, ${ride.time}`} />
        <Detail icon="cash-outline" label="Valor sugerido" value={ride.suggestedPrice} />
        <Detail icon="people-outline" label="Vagas disponíveis" value={`${ride.seats}`} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Observações</Text>
        <Text style={styles.bodyText}>{ride.notes}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Confiança antes de solicitar</Text>
          <VerifiedBadge compact />
        </View>
        <View style={styles.safetyList}>
          {ride.safetyFeatures.map((feature) => (
            <View key={feature} style={styles.safetyPill}>
              <Ionicons name="shield-checkmark-outline" size={16} color={colors.successDark} />
              <Text style={styles.safetyText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Últimas avaliações</Text>
        <View style={styles.reviewLine}>
          <RatingStars rating={driver.rating} />
          <Text style={styles.reviewText}>Comunidade destaca pontualidade, comunicação e segurança.</Text>
        </View>
      </View>

      <PrimaryButton
        title={alreadyRequested ? "Solicitação enviada" : "Solicitar vaga"}
        icon={alreadyRequested ? "checkmark-circle-outline" : "add-circle-outline"}
        disabled={alreadyRequested}
        onPress={() => {
          requestRide(ride.id);
          navigation.navigate("RequestConfirmed", { rideId: ride.id });
        }}
      />
      <PrimaryButton
        title="Ver recursos de segurança"
        icon="shield-checkmark-outline"
        variant="outline"
        onPress={() => navigation.navigate("MainTabs", { screen: "Safety" })}
      />
    </ScrollView>
  );
}

function RoutePreview() {
  return (
    <View style={styles.routePreview}>
      <View style={styles.routeDot} />
      <View style={styles.routeLine} />
      <View style={[styles.routeDot, styles.routeDotEnd]} />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
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
  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  label: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "800",
  },
  title: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  routeTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  routePreview: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.md,
  },
  routeDot: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 16,
    width: 16,
  },
  routeDotEnd: {
    backgroundColor: colors.success,
  },
  routeLine: {
    backgroundColor: colors.border,
    flex: 1,
    height: 4,
  },
  driverStats: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  stat: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    flex: 1,
    padding: spacing.sm,
  },
  statValue: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    marginTop: 2,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  detail: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexBasis: "48%",
    flexGrow: 1,
    gap: spacing.xs,
    minHeight: 118,
    padding: spacing.md,
  },
  detailLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: "800",
  },
  detailValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "800",
    lineHeight: 18,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  sectionRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "space-between",
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
  safetyList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  safetyPill: {
    alignItems: "center",
    backgroundColor: colors.successSoft,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  safetyText: {
    color: colors.successDark,
    fontSize: typography.small,
    fontWeight: "800",
  },
  reviewLine: {
    gap: spacing.sm,
  },
  reviewText: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 19,
  },
});
