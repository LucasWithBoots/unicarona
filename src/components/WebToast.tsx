import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../theme";

interface ToastMessage {
  id: number;
  title: string;
  message?: string;
}

let listener: ((toast: ToastMessage) => void) | undefined;
let nextId = 0;

// Alert.alert não aparece na web; lá a mensagem vira um aviso flutuante.
export function notify(title: string, message?: string) {
  if (Platform.OS !== "web" || !listener) {
    Alert.alert(title, message);
    return;
  }

  listener({ id: nextId++, title, message });
}

export function WebToast() {
  const [toast, setToast] = useState<ToastMessage>();

  useEffect(() => {
    listener = setToast;
    return () => {
      listener = undefined;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(undefined), 3200);
    return () => clearTimeout(timeout);
  }, [toast]);

  if (Platform.OS !== "web" || !toast) return null;

  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <View key={toast.id} style={styles.toast}>
        <View style={styles.icon}>
          <Ionicons name="checkmark" size={16} color={colors.surface} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{toast.title}</Text>
          {toast.message ? <Text style={styles.message}>{toast.message}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    left: spacing.lg,
    position: "absolute",
    right: spacing.lg,
    top: spacing.lg,
  },
  toast: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.md,
    maxWidth: 420,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.floating,
  },
  icon: {
    alignItems: "center",
    backgroundColor: colors.success,
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  copy: { flexShrink: 1, gap: 2 },
  title: { color: colors.surface, fontSize: 14, fontWeight: "900" },
  message: { color: "rgba(255,255,255,0.75)", fontSize: typography.small, lineHeight: 18 },
});
