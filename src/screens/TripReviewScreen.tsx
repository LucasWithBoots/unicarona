import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "TripReview">;

const criteria = ["Pontualidade", "Comunicação", "Respeito", "Segurança"];

export function TripReviewScreen({ navigation, route }: Props) {
  const { getRideById, getUserById } = useAppData();
  const [rating, setRating] = useState(5);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(["Pontualidade", "Segurança"]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ride = route.params?.rideId ? getRideById(route.params.rideId) : undefined;
  const driver = ride ? getUserById(ride.driverId) : undefined;

  function toggleCriterion(item: string) {
    setSelectedCriteria((current) =>
      current.includes(item) ? current.filter((criterion) => criterion !== item) : [...current, item],
    );
  }

  if (submitted) {
    return (
      <View style={styles.confirmation}>
        <Ionicons name="checkmark-circle" size={76} color={colors.success} />
        <Text style={styles.confirmTitle}>Avaliação enviada</Text>
        <Text style={styles.confirmText}>
          Obrigado por ajudar a comunidade universitária a manter caronas mais seguras e confiáveis.
        </Text>
        <PrimaryButton
          title="Voltar para minhas caronas"
          icon="car-sport-outline"
          onPress={() => navigation.navigate("MainTabs", { screen: "MyRides" })}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>Como foi a carona?</Text>
        <Text style={styles.subtitle}>
          Sua avaliação ajuda outros estudantes a decidir com mais segurança.
        </Text>
      </View>

      {driver && ride ? (
        <View style={styles.tripBox}>
          <Text style={styles.tripLabel}>Viagem avaliada</Text>
          <Text style={styles.tripRoute}>{ride.origin} → {ride.destination}</Text>
          <Text style={styles.tripMeta}>Motorista: {driver.name} • {ride.time}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Nota geral</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity activeOpacity={0.75} key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={rating >= star ? "star" : "star-outline"}
                size={38}
                color={colors.warning}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Critérios rápidos</Text>
        <View style={styles.criteria}>
          {criteria.map((item) => {
            const selected = selectedCriteria.includes(item);

            return (
              <TouchableOpacity
                activeOpacity={0.82}
                key={item}
                onPress={() => toggleCriterion(item)}
                style={[styles.criterion, selected && styles.criterionSelected]}
              >
                <Text style={[styles.criterionText, selected && styles.criterionTextSelected]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <InputField
        label="Comentário opcional"
        icon="chatbox-ellipses-outline"
        multiline
        placeholder="Ex.: pontual, comunicativo e rota tranquila."
        value={comment}
        onChangeText={setComment}
        style={styles.comment}
      />

      <PrimaryButton title="Enviar avaliação" icon="send-outline" onPress={() => setSubmitted(true)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  tripBox: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  tripLabel: {
    color: colors.primary,
    fontSize: typography.small,
    fontWeight: "900",
  },
  tripRoute: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  tripMeta: {
    color: colors.muted,
    fontSize: typography.small,
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
  stars: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  criteria: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  criterion: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  criterionSelected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  criterionText: {
    color: colors.muted,
    fontWeight: "800",
  },
  criterionTextSelected: {
    color: colors.surface,
  },
  comment: {
    minHeight: 98,
    textAlignVertical: "top",
  },
  confirmation: {
    alignItems: "center",
    flex: 1,
    gap: spacing.lg,
    justifyContent: "center",
    padding: spacing.xl,
  },
  confirmTitle: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "900",
    textAlign: "center",
  },
  confirmText: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 23,
    textAlign: "center",
  },
});
