import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { colors, radius, spacing, typography } from "../theme";

interface InputFieldProps extends TextInputProps {
  label: string;
  helper?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function InputField({ label, helper, icon, style, ...inputProps }: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon ? <Ionicons name={icon} size={18} color={colors.muted} /> : null}
        <TextInput
          placeholderTextColor={colors.subtle}
          style={[styles.input, style]}
          {...inputProps}
        />
      </View>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "700",
  },
  inputWrapper: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: typography.body,
    minHeight: 48,
  },
  helper: {
    color: colors.muted,
    fontSize: typography.tiny,
  },
});
