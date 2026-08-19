import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppData } from "../context/AppDataContext";
import { RootStackParamList } from "../navigation/types";
import { Ride, User } from "../types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const palette = {
  purple: "#6D55F7",
  purpleDark: "#382779",
  lavender: "#E8E1FF",
  lilac: "#F7F5FC",
  white: "#FFFFFF",
  ink: "#1D1A2D",
  muted: "#777187",
  line: "#EAE7F1",
  mint: "#DDF7EB",
  mintText: "#277A5A",
  coral: "#FFE7E0",
};

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { currentUser, getUserById, rides } = useAppData();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.header}>
            <View style={styles.headingCopy}>
              <Text style={styles.greeting}>Olá, {currentUser.name.split(" ")[0]}!</Text>
              <Text style={styles.subtitle}>Para onde vamos hoje?</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{currentUser.avatarInitials}</Text>
              <View style={styles.onlineDot} />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => navigation.navigate("Filters")}
            style={styles.searchBox}
          >
            <View style={styles.searchIcon}>
              <Ionicons name="search" size={20} color={palette.purple} />
            </View>
            <View style={styles.searchCopy}>
              <Text style={styles.searchLabel}>Encontre sua próxima carona</Text>
              <Text style={styles.searchHint}>Origem, destino ou campus</Text>
            </View>
            <View style={styles.filterButton}>
              <Ionicons name="options" size={18} color={palette.white} />
            </View>
          </TouchableOpacity>

          <View style={styles.shortcuts}>
            <Shortcut icon="school-outline" label="Campus" />
            <Shortcut icon="business-outline" label="Centro" />
            <Shortcut icon="time-outline" label="Agora" />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.promoCard}>
            <View style={styles.promoDecoration} />
            <View style={styles.promoCopy}>
              <View style={styles.promoPill}>
                <Ionicons name="shield-checkmark" size={13} color={palette.mintText} />
                <Text style={styles.promoPillText}>Comunidade verificada</Text>
              </View>
              <Text style={styles.promoTitle}>Vá junto.{"\n"}Chegue melhor.</Text>
              <Text style={styles.promoText}>Caronas pensadas para a rotina universitária.</Text>
            </View>
            <View style={styles.promoCar}>
              <Ionicons name="car-sport" size={54} color={palette.white} />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Caronas sugeridas</Text>
              <Text style={styles.sectionSubtitle}>{rides.length} opções perto de você</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Filters")} style={styles.seeAll}>
              <Text style={styles.seeAllText}>Filtrar</Text>
              <Ionicons name="chevron-forward" size={15} color={palette.purple} />
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            {rides.map((ride) => (
              <RoundedRideCard
                key={ride.id}
                ride={ride}
                driver={getUserById(ride.driverId)}
                onPress={() => navigation.navigate("RideDetails", { rideId: ride.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Shortcut({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.shortcut}>
      <Ionicons name={icon} size={15} color={palette.purpleDark} />
      <Text style={styles.shortcutText}>{label}</Text>
    </View>
  );
}

function RoundedRideCard({ ride, driver, onPress }: { ride: Ride; driver?: User; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={styles.rideCard}>
      <View style={styles.rideTopRow}>
        <View style={styles.datePill}>
          <Ionicons name="calendar-clear-outline" size={14} color={palette.purple} />
          <Text style={styles.dateText}>{ride.date}, {ride.time}</Text>
        </View>
        <Text style={styles.price}>{ride.suggestedPrice}</Text>
      </View>

      <View style={styles.routeRow}>
        <View style={styles.routeMarkers}>
          <View style={styles.originDot} />
          <View style={styles.routeLine} />
          <View style={styles.destinationDot} />
        </View>
        <View style={styles.routeCopy}>
          <Text numberOfLines={1} style={styles.origin}>{ride.origin}</Text>
          <Text numberOfLines={1} style={styles.destination}>{ride.destination}</Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <View style={styles.driverBlock}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>{driver?.avatarInitials ?? "UC"}</Text>
          </View>
          <View>
            <View style={styles.driverNameRow}>
              <Text style={styles.driverName}>{driver?.name ?? "Motorista"}</Text>
              <Ionicons name="checkmark-circle" size={14} color={palette.purple} />
            </View>
            <Text style={styles.driverMeta}>★ {driver?.rating.toFixed(1) ?? "--"}  •  {ride.seats} vagas</Text>
          </View>
        </View>
        <View style={styles.arrowButton}>
          <Ionicons name="arrow-forward" size={18} color={palette.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: palette.lavender, flex: 1 },
  container: { backgroundColor: palette.lilac, paddingBottom: 108 },
  hero: {
    backgroundColor: palette.lavender,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    gap: 20,
    padding: 20,
    paddingBottom: 26,
  },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  headingCopy: { gap: 2 },
  greeting: { color: palette.ink, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 },
  subtitle: { color: palette.purpleDark, fontSize: 14, fontWeight: "600" },
  avatar: {
    alignItems: "center",
    backgroundColor: palette.purple,
    borderColor: palette.white,
    borderRadius: 18,
    borderWidth: 3,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  avatarText: { color: palette.white, fontWeight: "900" },
  onlineDot: {
    backgroundColor: "#48C78E",
    borderColor: palette.white,
    borderRadius: 6,
    borderWidth: 2,
    bottom: -1,
    height: 12,
    position: "absolute",
    right: -1,
    width: 12,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: 22,
    flexDirection: "row",
    gap: 12,
    minHeight: 72,
    padding: 10,
    shadowColor: palette.purpleDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
  },
  searchIcon: {
    alignItems: "center",
    backgroundColor: palette.lilac,
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  searchCopy: { flex: 1 },
  searchLabel: { color: palette.ink, fontSize: 14, fontWeight: "800" },
  searchHint: { color: palette.muted, fontSize: 12, marginTop: 2 },
  filterButton: {
    alignItems: "center",
    backgroundColor: palette.purple,
    borderRadius: 15,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  shortcuts: { flexDirection: "row", gap: 8 },
  shortcut: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.64)",
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  shortcutText: { color: palette.purpleDark, fontSize: 12, fontWeight: "800" },
  body: { gap: 22, padding: 20, paddingTop: 24 },
  promoCard: {
    backgroundColor: palette.purple,
    borderRadius: 28,
    minHeight: 160,
    overflow: "hidden",
    padding: 20,
  },
  promoDecoration: {
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    borderWidth: 24,
    height: 190,
    position: "absolute",
    right: -76,
    top: -68,
    width: 190,
  },
  promoCopy: { maxWidth: "62%" },
  promoPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: palette.mint,
    borderRadius: 999,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  promoPillText: { color: palette.mintText, fontSize: 10, fontWeight: "800" },
  promoTitle: {
    color: palette.white,
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.7,
    lineHeight: 27,
    marginTop: 12,
  },
  promoText: { color: "rgba(255,255,255,0.76)", fontSize: 11, lineHeight: 15, marginTop: 7 },
  promoCar: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.17)",
    borderRadius: 25,
    height: 100,
    justifyContent: "center",
    position: "absolute",
    right: 16,
    top: 30,
    transform: [{ rotate: "-5deg" }],
    width: 102,
  },
  sectionHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  sectionTitle: { color: palette.ink, fontSize: 21, fontWeight: "900", letterSpacing: -0.4 },
  sectionSubtitle: { color: palette.muted, fontSize: 12, marginTop: 2 },
  seeAll: { alignItems: "center", flexDirection: "row", gap: 2 },
  seeAllText: { color: palette.purple, fontSize: 13, fontWeight: "800" },
  list: { gap: 14 },
  rideCard: {
    backgroundColor: palette.white,
    borderRadius: 26,
    gap: 16,
    padding: 18,
    shadowColor: "#29213F",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
  },
  rideTopRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  datePill: {
    alignItems: "center",
    backgroundColor: palette.lilac,
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  dateText: { color: palette.purpleDark, fontSize: 11, fontWeight: "800" },
  price: { color: palette.purple, fontSize: 16, fontWeight: "900" },
  routeRow: { flexDirection: "row", gap: 12 },
  routeMarkers: { alignItems: "center", paddingVertical: 4 },
  originDot: {
    backgroundColor: palette.white,
    borderColor: palette.purple,
    borderRadius: 6,
    borderWidth: 3,
    height: 12,
    width: 12,
  },
  routeLine: { backgroundColor: palette.line, flex: 1, marginVertical: 3, minHeight: 20, width: 2 },
  destinationDot: { backgroundColor: palette.purple, borderRadius: 6, height: 12, width: 12 },
  routeCopy: { flex: 1, gap: 17 },
  origin: { color: palette.muted, fontSize: 13, fontWeight: "700" },
  destination: { color: palette.ink, fontSize: 15, fontWeight: "900" },
  rideFooter: {
    alignItems: "center",
    borderTopColor: palette.line,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
  },
  driverBlock: { alignItems: "center", flexDirection: "row", gap: 10 },
  driverAvatar: {
    alignItems: "center",
    backgroundColor: palette.coral,
    borderRadius: 15,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  driverAvatarText: { color: "#984A38", fontSize: 12, fontWeight: "900" },
  driverNameRow: { alignItems: "center", flexDirection: "row", gap: 4 },
  driverName: { color: palette.ink, fontSize: 13, fontWeight: "900" },
  driverMeta: { color: palette.muted, fontSize: 11, marginTop: 2 },
  arrowButton: {
    alignItems: "center",
    backgroundColor: palette.purple,
    borderRadius: 15,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
});
