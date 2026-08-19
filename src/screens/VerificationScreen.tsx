import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "../components/PrimaryButton";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";
import { VerificationMethod } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Verification">;

export function VerificationScreen({ navigation, route }: Props) {
  const [method, setMethod] = useState<VerificationMethod>("email");
  const [verified, setVerified] = useState(false);
  const email = route.params?.email ?? "seu e-mail institucional";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Verificação universitária</Text>
          <Text style={styles.subtitle}>
            Antes de entrar na comunidade, confirme seu vínculo acadêmico por e-mail institucional ou comprovante.
          </Text>
        </View>

        <View style={styles.methods}>
          <MethodCard
            active={method === "email"}
            icon="mail-open-outline"
            title="E-mail institucional"
            description={`Enviar confirmação para ${email}.`}
            onPress={() => setMethod("email")}
          />
          <MethodCard
            active={method === "document"}
            icon="document-text-outline"
            title="Comprovante de matrícula"
            description="Simular envio de documento para validação acadêmica."
            onPress={() => setMethod("document")}
          />
        </View>

        {verified ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={34} color={colors.success} />
            <View style={styles.successText}>
              <Text style={styles.successTitle}>Verificação concluída</Text>
              <VerifiedBadge />
            </View>
          </View>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton
            title={verified ? "Ir para o app" : "Confirmar verificação"}
            icon={verified ? "car-sport-outline" : "shield-checkmark-outline"}
            onPress={() => {
              if (verified) {
                navigation.replace("MainTabs");
              } else {
                setVerified(true);
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

interface MethodCardProps {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
}

function MethodCard({ active, icon, title, description, onPress }: MethodCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={[styles.methodCard, active && styles.methodActive]}>
      <View style={[styles.methodIcon, active && styles.methodIconActive]}>
        <Ionicons name={icon} size={24} color={active ? colors.surface : colors.primary} />
      </View>
      <View style={styles.methodText}>
        <Text style={styles.methodTitle}>{title}</Text>
        <Text style={styles.methodDescription}>{description}</Text>
      </View>
      <Ionicons
        name={active ? "radio-button-on" : "radio-button-off"}
        size={20}
        color={active ? colors.primary : colors.subtle}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: "center",
    padding: spacing.xl,
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
  methods: {
    gap: spacing.md,
  },
  methodCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  methodActive: {
    borderColor: colors.primary,
  },
  methodIcon: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  methodIconActive: {
    backgroundColor: colors.primary,
  },
  methodText: {
    flex: 1,
    gap: spacing.xs,
  },
  methodTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  methodDescription: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 18,
  },
  successBox: {
    alignItems: "center",
    backgroundColor: colors.successSoft,
    borderColor: "#B6E7C4",
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  successText: {
    flex: 1,
    gap: spacing.sm,
  },
  successTitle: {
    color: colors.successDark,
    fontSize: typography.body,
    fontWeight: "900",
  },
  actions: {
    gap: spacing.md,
  },
});
