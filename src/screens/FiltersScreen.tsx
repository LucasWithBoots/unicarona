import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Filters">;

const times = ["Manhã", "Tarde", "Noite", "Agora"];

export function FiltersScreen({ navigation }: Props) {
  const [origin, setOrigin] = useState("Centro de Alfenas");
  const [destination, setDestination] = useState("Campus UNIFAL");
  const [time, setTime] = useState("Noite");
  const [maxPrice, setMaxPrice] = useState("R$ 8,00");

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Encontrar a melhor carona</Text>
      <Text style={styles.subtitle}>A busca é simulada no MVP, mas mostra os critérios principais do fluxo.</Text>

      <View style={styles.form}>
        <InputField label="Origem" icon="location-outline" value={origin} onChangeText={setOrigin} />
        <InputField label="Destino" icon="flag-outline" value={destination} onChangeText={setDestination} />
        <InputField label="Valor máximo sugerido" icon="cash-outline" value={maxPrice} onChangeText={setMaxPrice} />

        <View style={styles.block}>
          <Text style={styles.label}>Horário</Text>
          <View style={styles.options}>
            {times.map((item) => (
              <TouchableOpacity
                activeOpacity={0.82}
                key={item}
                onPress={() => setTime(item)}
                style={[styles.option, time === item && styles.optionSelected]}
              >
                <Text style={[styles.optionText, time === item && styles.optionTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Prioridade de segurança</Text>
        <Text style={styles.infoText}>
          Por padrão, o UniCarona exibe primeiro motoristas verificados e caronas com recursos de proteção.
        </Text>
      </View>

      <PrimaryButton
        title="Aplicar filtros"
        icon="checkmark-circle-outline"
        onPress={() => {
          Alert.alert("Filtros aplicados", "Lista atualizada com caronas compatíveis no protótipo.");
          navigation.goBack();
        }}
      />
    </ScrollView>
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
  form: {
    gap: spacing.md,
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.muted,
    fontWeight: "800",
  },
  optionTextSelected: {
    color: colors.surface,
  },
  infoBox: {
    backgroundColor: colors.infoSoft,
    borderColor: "#BDE7FA",
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  infoTitle: {
    color: colors.primaryDark,
    fontSize: typography.body,
    fontWeight: "900",
  },
  infoText: {
    color: colors.primaryDark,
    fontSize: typography.small,
    lineHeight: 19,
  },
});
