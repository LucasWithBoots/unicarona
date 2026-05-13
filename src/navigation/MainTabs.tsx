import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { MyRidesScreen } from "../screens/MyRidesScreen";
import { OfferRideScreen } from "../screens/OfferRideScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SafetyScreen } from "../screens/SafetyScreen";
import { colors } from "../theme";
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtle,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: focused ? "home" : "home-outline",
            OfferRide: focused ? "add-circle" : "add-circle-outline",
            MyRides: focused ? "car-sport" : "car-sport-outline",
            Safety: focused ? "shield-checkmark" : "shield-checkmark-outline",
            Profile: focused ? "person-circle" : "person-circle-outline",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Tab.Screen name="OfferRide" component={OfferRideScreen} options={{ title: "Oferecer" }} />
      <Tab.Screen name="MyRides" component={MyRidesScreen} options={{ title: "Minhas" }} />
      <Tab.Screen name="Safety" component={SafetyScreen} options={{ title: "Segurança" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
    </Tab.Navigator>
  );
}
