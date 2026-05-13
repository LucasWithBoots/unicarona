import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";
import { OfferRideDraft } from "../types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const recurrences = ["Única", "Dias úteis", "Aulas noturnas", "Semanal"];

export function OfferRideScreen() {
  const navigation = useNavigation<Navigation>();
  const [draft, setDraft] = useState<OfferRideDraft>({
    origin: "Campus UNIFAL",
    destination: "Centro de Alfenas",
    date: "Hoje",
    time: "21:45",
    seats: 3,
    suggestedPrice: "R$ 6,00",
    campus: "Campus UNIFAL",
    recurrence: "Aulas noturnas",
    meetingPoint: "Biblioteca central",
    notes: "Retorno após aula. Aceito solicitações de estudantes verificados.",
  });

  function updateField<Key extends keyof OfferRideDraft>(key: Key, value: OfferRideDraft[Key]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleReview() {
    if (!draft.origin.trim() || !draft.destination.trim() || !draft.time.trim()) {
      Alert.alert("Preencha a rota", "Origem, destino e horário são obrigatórios para publicar uma carona.");
      return;
    }

    navigation.navigate("OfferReview", { draft });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Oferecer carona</Text>
          <Text style={styles.subtitle}>
            Publique uma rota simples, com informações claras para estudantes interessados.
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Origem"
            icon="location-outline"
            value={draft.origin}
            onChangeText={(value) => updateField("origin", value)}
          />
          <InputField
            label="Destino"
            icon="flag-outline"
            value={draft.destination}
            onChangeText={(value) => updateField("destination", value)}
          />
          <View style={styles.row}>
            <View style={styles.flex}>
              <InputField
                label="Data"
                icon="calendar-outline"
                value={draft.date}
                onChangeText={(value) => updateField("date", value)}
              />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Horário"
                icon="time-outline"
                value={draft.time}
                onChangeText={(value) => updateField("time", value)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex}>
              <InputField
                label="Vagas"
                icon="people-outline"
                keyboardType="number-pad"
                value={String(draft.seats)}
                onChangeText={(value) => updateField("seats", Number(value) || 1)}
              />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Valor"
                icon="cash-outline"
                value={draft.suggestedPrice}
                onChangeText={(value) => updateField("suggestedPrice", value)}
              />
            </View>
          </View>
          <InputField
            label="Campus"
            icon="school-outline"
            value={draft.campus}
            onChangeText={(value) => updateField("campus", value)}
          />
          <InputField
            label="Ponto de encontro"
            icon="pin-outline"
            value={draft.meetingPoint}
            onChangeText={(value) => updateField("meetingPoint", value)}
          />

          <View style={styles.block}>
            <Text style={styles.label}>Recorrência</Text>
            <View style={styles.options}>
              {recurrences.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.82}
                  key={item}
                  onPress={() => updateField("recurrence", item)}
                  style={[styles.option, draft.recurrence === item && styles.optionSelected]}
                >
                  <Text style={[styles.optionText, draft.recurrence === item && styles.optionTextSelected]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <InputField
            label="Observações"
            icon="chatbox-ellipses-outline"
            multiline
            value={draft.notes}
            onChangeText={(value) => updateField("notes", value)}
            style={styles.multiline}
          />
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityTitle}>Publicação segura</Text>
          <Text style={styles.securityText}>
            Passageiros interessados aparecem em solicitações recebidas para você aceitar ou recusar.
          </Text>
        </View>

        <PrimaryButton title="Revisar oferta" icon="checkmark-circle-outline" onPress={handleReview} />
      </ScrollView>
    </SafeAreaView>
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
  form: {
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  flex: {
    flex: 1,
  },
  block: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "800",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  option: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionSelected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  optionText: {
    color: colors.muted,
    fontWeight: "800",
  },
  optionTextSelected: {
    color: colors.surface,
  },
  multiline: {
    minHeight: 82,
    textAlignVertical: "top",
  },
  securityNote: {
    backgroundColor: colors.successSoft,
    borderColor: "#B6E7C4",
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
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
