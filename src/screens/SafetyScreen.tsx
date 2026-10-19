import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SafetyActionCard } from "../components/SafetyActionCard";
import { notify } from "../components/WebToast";
import { useWideLayout, wideColumn } from "../hooks/useWideLayout";
import { colors, radius, spacing, typography, wideLayout } from "../theme";

export function SafetyScreen() {
  const wide = useWideLayout();
  const cardStyle = wide ? styles.actionWide : undefined;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.container, wide && [wideColumn(wideLayout.page), styles.containerWide]]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Segurança</Text>
          <Text style={styles.subtitle}>
            Recursos de proteção para usar antes, durante e depois da carona.
          </Text>
        </View>

        <View style={styles.emergencyBox}>
          <Text style={styles.emergencyTitle}>Botão de emergência</Text>
          <Text style={styles.emergencyText}>Acione rapidamente em situações de risco durante a viagem.</Text>
          <SafetyActionCard
            title="Acionar emergência"
            description="Simula contato com suporte e pessoa de confiança."
            icon="alert-circle-outline"
            tone="danger"
            onPress={() => notify("Emergência acionada", "Contato de confiança e suporte foram notificados.")}
          />
        </View>

        <View style={[styles.actions, wide && styles.actionsWide]}>
          <SafetyActionCard
            style={cardStyle}
            title="Compartilhar rota"
            description="Envie a rota para um contato de confiança."
            icon="share-social-outline"
            tone="success"
            onPress={() => notify("Rota compartilhada", "O contato de confiança recebeu o link da viagem.")}
          />
          <SafetyActionCard
            style={cardStyle}
            title="Denunciar usuário"
            description="Relate comportamento inadequado para análise."
            icon="flag-outline"
            tone="warning"
            onPress={() => notify("Denúncia registrada", "Seu relato foi recebido para análise.")}
          />
          <SafetyActionCard
            style={cardStyle}
            title="Bloquear usuário"
            description="Evite novas interações com um perfil específico."
            icon="ban-outline"
            tone="danger"
            onPress={() => notify("Usuário bloqueado", "Esse perfil não poderá interagir com você.")}
          />
          <SafetyActionCard
            style={cardStyle}
            title="Dicas de segurança"
            description="Combine ponto público, confira perfil e compartilhe a rota."
            icon="bulb-outline"
            onPress={() =>
              notify(
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
  containerWide: { gap: spacing.xl, padding: spacing.xxl },
  actionsWide: { flexDirection: "row", flexWrap: "wrap" },
  actionWide: { flexBasis: "45%", flexGrow: 1 },
});
