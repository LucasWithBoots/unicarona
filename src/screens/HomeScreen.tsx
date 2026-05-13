import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RideCard } from "../components/RideCard";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing, typography } from "../theme";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { currentUser, getUserById, rides } = useAppData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {currentUser.name.split(" ")[0]}</Text>
            <Text style={styles.subtitle}>Encontre uma carona segura para sua rotina acadêmica.</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{currentUser.avatarInitials}</Text>
          </View>
        </View>

        <View style={styles.trustRow}>
          <VerifiedBadge />
          <View style={styles.trustPill}>
            <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
            <Text style={styles.trustText}>Segurança ativa</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.86} onPress={() => navigation.navigate("Filters")} style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={22} color={colors.primary} />
          </View>
          <View style={styles.searchTextBox}>
            <Text style={styles.searchTitle}>Buscar carona</Text>
            <Text style={styles.searchSubtitle}>Origem, destino, horário ou campus</Text>
          </View>
          <Ionicons name="options-outline" size={22} color={colors.muted} />
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <Stat label="Caronas hoje" value={`${rides.length}`} />
          <Stat label="Verificadas" value="100%" />
          <Stat label="Média" value="4.8" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Caronas disponíveis</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Filters")}>
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              driver={getUserById(ride.driverId)}
              onPress={() => navigation.navigate("RideDetails", { rideId: ride.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  greeting: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: 18,
    maxWidth: 260,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  avatarText: {
    color: colors.surface,
    fontWeight: "900",
  },
  trustRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  trustPill: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  trustText: {
    color: colors.primaryDark,
    fontSize: typography.small,
    fontWeight: "800",
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  searchIcon: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  searchTextBox: {
    flex: 1,
  },
  searchTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  searchSubtitle: {
    color: colors.muted,
    fontSize: typography.small,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  stat: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md,
  },
  statValue: {
    color: colors.primary,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: "700",
    marginTop: 2,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "900",
  },
  filterText: {
    color: colors.primary,
    fontWeight: "900",
  },
  list: {
    gap: spacing.md,
  },
});
