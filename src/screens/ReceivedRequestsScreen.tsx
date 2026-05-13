import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../components/PrimaryButton";
import { UserCard } from "../components/UserCard";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";
import { RequestStatus } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "ReceivedRequests">;

export function ReceivedRequestsScreen({ navigation }: Props) {
  const { getRideById, getUserById, myRides, requests, updateRequestStatus } = useAppData();
  const myRideIds = myRides.map((ride) => ride.id);
  const received = requests.filter((request) => myRideIds.includes(request.rideId));

  function handleStatus(requestId: string, status: RequestStatus) {
    updateRequestStatus(requestId, status);
    Alert.alert(status === "accepted" ? "Solicitação aceita" : "Solicitação recusada");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Passageiros interessados</Text>
      <Text style={styles.subtitle}>
        Revise perfil, avaliação e mensagem antes de aceitar uma vaga.
      </Text>

      {received.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Nenhuma solicitação recebida ainda.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {received.map((request) => {
            const passenger = getUserById(request.passengerId);
            const ride = getRideById(request.rideId);

            if (!passenger || !ride) {
              return null;
            }

            return (
              <UserCard
                key={request.id}
                user={passenger}
                subtitle={`${passenger.course} • ${passenger.trips} viagens`}
                rightContent={<StatusBadge status={request.status} />}
              >
                <View style={styles.requestBody}>
                  <Text style={styles.rideText}>{ride.origin} → {ride.destination} • {ride.time}</Text>
                  <Text style={styles.message}>{request.message}</Text>
                  {request.status === "pending" ? (
                    <View style={styles.actions}>
                      <PrimaryButton
                        title="Recusar"
                        variant="outline"
                        style={styles.actionButton}
                        onPress={() => handleStatus(request.id, "declined")}
                      />
                      <PrimaryButton
                        title="Aceitar"
                        icon="checkmark-circle-outline"
                        variant="secondary"
                        style={styles.actionButton}
                        onPress={() => handleStatus(request.id, "accepted")}
                      />
                    </View>
                  ) : null}
                </View>
              </UserCard>
            );
          })}
        </View>
      )}

      <PrimaryButton
        title="Voltar para minhas caronas"
        variant="outline"
        onPress={() => navigation.navigate("MainTabs", { screen: "MyRides" })}
      />
    </ScrollView>
  );
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const labels = {
    pending: "Pendente",
    accepted: "Aceita",
    declined: "Recusada",
  };
  const tone = status === "accepted" ? colors.successSoft : status === "declined" ? colors.dangerSoft : colors.warningSoft;
  const textColor = status === "accepted" ? colors.successDark : status === "declined" ? colors.danger : "#9A6700";

  return (
    <View style={[styles.statusBadge, { backgroundColor: tone }]}>
      <Text style={[styles.statusText, { color: textColor }]}>{labels[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
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
  list: {
    gap: spacing.md,
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
  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: typography.tiny,
    fontWeight: "900",
  },
  requestBody: {
    gap: spacing.md,
  },
  rideText: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "900",
  },
  message: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 19,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});
