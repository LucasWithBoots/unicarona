import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("ana.beatriz@unifal.edu.br");
  const [password, setPassword] = useState("unicarona");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Entrar no UniCarona</Text>
          <Text style={styles.subtitle}>Use sua conta universitária para pedir ou oferecer caronas.</Text>
        </View>

        <View style={styles.form}>
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
          />
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.forgot}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Entrar"
            icon="shield-checkmark-outline"
            onPress={() => navigation.replace("MainTabs")}
          />
          <PrimaryButton
            title="Criar conta"
            variant="ghost"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </SafeAreaView>
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
  forgot: {
    color: colors.primary,
    fontSize: typography.small,
    fontWeight: "800",
    textAlign: "right",
  },
  actions: {
    gap: spacing.md,
  },
});
