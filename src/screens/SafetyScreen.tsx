import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SafetyActionCard } from "../components/SafetyActionCard";
import { colors, radius, spacing, typography } from "../theme";

export function SafetyScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Segurança</Text>
          <Text style={styles.subtitle}>Recursos simulados para demonstrar confiança antes, durante e depois da carona.</Text>
        </View>

        <View style={styles.emergencyBox}>
          <Text style={styles.emergencyTitle}>Botão de emergência</Text>
          <Text style={styles.emergencyText}>Acione rapidamente em situações de risco durante a viagem.</Text>
          <SafetyActionCard
            title="Acionar emergência"
            description="Simula contato com suporte e pessoa de confiança."
            icon="alert-circle-outline"
            tone="danger"
            onPress={() => Alert.alert("Emergência simulada", "Contato de confiança e suporte foram notificados no protótipo.")}
          />
        </View>

        <View style={styles.actions}>
          <SafetyActionCard
            title="Compartilhar rota"
            description="Envie a rota para um contato de confiança."
            icon="share-social-outline"
            tone="success"
            onPress={() => Alert.alert("Rota compartilhada", "Link simulado enviado ao contato de confiança.")}
          />
          <SafetyActionCard
            title="Denunciar usuário"
            description="Relate comportamento inadequado para análise."
            icon="flag-outline"
            tone="warning"
            onPress={() => Alert.alert("Denúncia registrada", "Seu relato foi salvo de forma simulada.")}
          />
          <SafetyActionCard
            title="Bloquear usuário"
            description="Evite novas interações com um perfil específico."
            icon="ban-outline"
            tone="danger"
            onPress={() => Alert.alert("Usuário bloqueado", "Bloqueio simulado aplicado ao protótipo.")}
          />
          <SafetyActionCard
            title="Dicas de segurança"
            description="Combine ponto público, confira perfil e compartilhe a rota."
            icon="bulb-outline"
            onPress={() =>
              Alert.alert(
                "Dicas rápidas",
                "Confira o selo verificado, prefira pontos iluminados, avise alguém de confiança e avalie a viagem ao final.",
              )
            }
          />
        </View>
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
  emergencyBox: {
    backgroundColor: colors.dangerSoft,
    borderColor: "#F5B7B7",
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  emergencyTitle: {
    color: colors.danger,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  emergencyText: {
    color: colors.danger,
    fontSize: typography.small,
    lineHeight: 19,
  },
  actions: {
    gap: spacing.md,
  },
});
