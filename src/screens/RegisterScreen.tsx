import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";
import { Shift } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const shifts: Shift[] = ["Matutino", "Vespertino", "Noturno", "Integral"];

export function RegisterScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("Ana Beatriz");
  const [email, setEmail] = useState("ana.beatriz@unifal.edu.br");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("UNIFAL-MG");
  const [campus, setCampus] = useState("Campus Sede - Alfenas");
  const [shift, setShift] = useState<Shift>("Noturno");

  return (
    <View style={styles.safeArea}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: insets.bottom + spacing.xxl,
            paddingLeft: Math.max(insets.left, spacing.xl),
            paddingRight: Math.max(insets.right, spacing.xl),
            paddingTop: Math.max(insets.top, spacing.xl),
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro universitário</Text>
          <Text style={styles.subtitle}>
            Dados acadêmicos ajudam a comunidade a reconhecer perfis confiáveis antes da carona.
          </Text>
        </View>

        <View style={styles.form}>
          <InputField label="Nome completo" icon="person-outline" value={name} onChangeText={setName} />
          <InputField
            autoCapitalize="none"
            keyboardType="email-address"
            label="E-mail"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            label="Senha"
            icon="lock-closed-outline"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Crie uma senha"
          />
          <InputField
            label="Universidade"
            icon="school-outline"
            value={university}
            onChangeText={setUniversity}
          />
          <InputField label="Campus" icon="business-outline" value={campus} onChangeText={setCampus} />

          <View style={styles.optionBlock}>
            <Text style={styles.label}>Turno</Text>
            <View style={styles.options}>
              {shifts.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={item}
                  onPress={() => setShift(item)}
                  style={[styles.option, shift === item && styles.optionSelected]}
                >
                  <Text style={[styles.optionText, shift === item && styles.optionTextSelected]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <PrimaryButton
          title="Continuar para verificação"
          icon="shield-checkmark-outline"
          onPress={() => navigation.navigate("Verification", { name, email })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    gap: spacing.xl,
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
  form: {
    gap: spacing.md,
  },
  optionBlock: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "700",
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
    fontWeight: "700",
  },
  optionTextSelected: {
    color: colors.surface,
  },
});
