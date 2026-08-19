import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../components/PrimaryButton";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "RequestConfirmed">;

export function RequestConfirmedScreen({ navigation, route }: Props) {
  const { getRideById } = useAppData();
  const ride = getRideById(route.params.rideId);

  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark-circle" size={74} color={colors.success} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Solicitação enviada</Text>
        <Text style={styles.subtitle}>
          O motorista recebeu seu pedido e você será avisado quando ele responder.
        </Text>
      </View>

      {ride ? (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Carona solicitada</Text>
          <Text style={styles.route}>{ride.origin} → {ride.destination}</Text>
          <Text style={styles.meta}>{ride.date}, {ride.time} • {ride.suggestedPrice}</Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <PrimaryButton
          title="Acompanhar viagem"
          icon="navigate-circle-outline"
          onPress={() => navigation.navigate("ActiveTrip", { rideId: route.params.rideId })}
        />
        <PrimaryButton
          title="Voltar ao início"
          variant="outline"
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: "center",
    padding: spacing.xl,
  },
  successIcon: {
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 23,
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  cardLabel: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "800",
  },
  route: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
  },
  actions: {
    gap: spacing.md,
  },
});
