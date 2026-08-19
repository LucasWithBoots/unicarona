import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "../components/PrimaryButton";
import { RideCard } from "../components/RideCard";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function MyRidesScreen() {
  const navigation = useNavigation<Navigation>();
  const { currentUser, getUserById, myRides, requests, rides } = useAppData();
  const pendingRequests = requests.filter(
    (request) => myRides.some((ride) => ride.id === request.rideId) && request.status === "pending",
  );
  const myPassengerRequests = requests.filter((request) => request.passengerId === currentUser.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Minhas caronas</Text>
          <Text style={styles.subtitle}>
            Acompanhe ofertas publicadas, pedidos enviados e próximas viagens.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.84}
          onPress={() => navigation.navigate("ReceivedRequests")}
          style={styles.requestsCard}
        >
          <View style={styles.requestsIcon}>
            <Ionicons name="mail-unread-outline" size={26} color={colors.primary} />
          </View>
          <View style={styles.requestsText}>
            <Text style={styles.requestsTitle}>Solicitações recebidas</Text>
            <Text style={styles.requestsSubtitle}>{pendingRequests.length} pedidos aguardando resposta</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.subtle} />
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ofertas publicadas</Text>
            <Text style={styles.sectionCount}>{myRides.length}</Text>
          </View>
          <View style={styles.list}>
            {myRides.map((ride) => (
              <View key={ride.id} style={styles.rideWrapper}>
                <RideCard
                  ride={ride}
                  driver={getUserById(ride.driverId)}
                  actionLabel="Ver detalhes"
                  onPress={() => navigation.navigate("RideDetails", { rideId: ride.id })}
                />
                <View style={styles.actionRow}>
                  <PrimaryButton
                    title="Solicitações"
                    icon="people-outline"
                    variant="outline"
                    style={styles.actionButton}
                    onPress={() => navigation.navigate("ReceivedRequests")}
                  />
                  <PrimaryButton
                    title="Iniciar"
                    icon="play-circle-outline"
                    variant="secondary"
                    style={styles.actionButton}
                    onPress={() => navigation.navigate("ActiveTrip", { rideId: ride.id })}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pedidos enviados</Text>
            <Text style={styles.sectionCount}>{myPassengerRequests.length}</Text>
          </View>
          {myPassengerRequests.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Você ainda não solicitou vagas nesta sessão.</Text>
            </View>
          ) : (
            <View style={styles.list}>
              {myPassengerRequests.map((request) => {
                const ride = rides.find((item) => item.id === request.rideId);
                const driver = ride ? getUserById(ride.driverId) : undefined;

                if (!ride) {
                  return null;
                }

                return (
                  <View key={request.id} style={styles.requestSent}>
                    <Text style={styles.requestStatus}>{statusLabel(request.status)}</Text>
                    <Text style={styles.requestRoute}>{ride.origin} → {ride.destination}</Text>
                    <Text style={styles.requestMeta}>
                      Motorista: {driver?.name ?? "Perfil indisponível"} • {ride.time}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function statusLabel(status: string) {
  if (status === "accepted") {
    return "Aceita";
  }

  if (status === "declined") {
    return "Recusada";
  }

  return "Pendente";
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: 112,
  },
  header: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    gap: spacing.sm,
    padding: spacing.lg,
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
  requestsCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  requestsIcon: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  requestsText: {
    flex: 1,
    gap: spacing.xs,
  },
  requestsTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  requestsSubtitle: {
    color: colors.muted,
    fontSize: typography.small,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  sectionCount: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: "900",
  },
  list: {
    gap: spacing.md,
  },
  rideWrapper: {
    gap: spacing.sm,
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  emptyText: {
    color: colors.muted,
    fontSize: typography.body,
  },
  requestSent: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  requestStatus: {
    color: colors.primary,
    fontSize: typography.small,
    fontWeight: "900",
  },
  requestRoute: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  requestMeta: {
    color: colors.muted,
    fontSize: typography.small,
  },
});
