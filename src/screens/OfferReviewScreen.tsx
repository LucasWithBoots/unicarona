import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../components/PrimaryButton";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "OfferReview">;

export function OfferReviewScreen({ navigation, route }: Props) {
  const { draft } = route.params;
  const { publishRide } = useAppData();

  function handlePublish() {
    publishRide(draft);
    Alert.alert("Carona publicada", "Sua oferta já aparece em Minhas caronas.");
    navigation.navigate("MainTabs", { screen: "MyRides" });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Rota</Text>
        <Text style={styles.route}>{draft.origin}</Text>
        <Ionicons name="arrow-down" size={18} color={colors.primary} />
        <Text style={styles.route}>{draft.destination}</Text>
      </View>

      <View style={styles.grid}>
        <Item icon="calendar-outline" label="Data" value={draft.date} />
        <Item icon="time-outline" label="Horário" value={draft.time} />
        <Item icon="people-outline" label="Vagas" value={`${draft.seats}`} />
        <Item icon="cash-outline" label="Valor" value={draft.suggestedPrice} />
        <Item icon="school-outline" label="Campus" value={draft.campus} />
        <Item icon="repeat-outline" label="Recorrência" value={draft.recurrence} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ponto de encontro</Text>
        <Text style={styles.bodyText}>{draft.meetingPoint}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Observações</Text>
        <Text style={styles.bodyText}>{draft.notes || "Sem observações adicionais."}</Text>
      </View>

      <View style={styles.securityBox}>
        <Ionicons name="shield-checkmark-outline" size={24} color={colors.successDark} />
        <View style={styles.securityTextBox}>
          <Text style={styles.securityTitle}>Antes de publicar</Text>
          <Text style={styles.securityText}>
            Você poderá revisar passageiros interessados em Solicitações recebidas.
          </Text>
        </View>
      </View>

      <PrimaryButton title="Confirmar e publicar" icon="send-outline" onPress={handlePublish} />
      <PrimaryButton title="Editar oferta" variant="outline" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

function Item({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
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
  route: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  item: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexBasis: "48%",
    flexGrow: 1,
    gap: spacing.xs,
    minHeight: 104,
    padding: spacing.md,
  },
  itemLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: "800",
  },
  itemValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "900",
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
  securityBox: {
    alignItems: "center",
    backgroundColor: colors.successSoft,
    borderColor: "#B6E7C4",
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  securityTextBox: {
    flex: 1,
    gap: spacing.xs,
  },
  securityTitle: {
    color: colors.successDark,
    fontSize: typography.body,
    fontWeight: "900",
  },
  securityText: {
    color: colors.successDark,
    fontSize: typography.small,
    lineHeight: 19,
  },
});
