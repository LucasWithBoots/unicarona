import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { DesktopSidebar, SidebarItem } from "../components/DesktopSidebar";
import { useWideLayout } from "../hooks/useWideLayout";
import { HomeScreen } from "../screens/HomeScreen";
import { MyRidesScreen } from "../screens/MyRidesScreen";
import { OfferRideScreen } from "../screens/OfferRideScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SafetyScreen } from "../screens/SafetyScreen";
import { colors, shadows } from "../theme";
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

const tabItems: Record<keyof TabParamList, SidebarItem> = {
  Home: { active: "home", inactive: "home-outline", label: "Início" },
  OfferRide: { active: "add-circle", inactive: "add-circle-outline", label: "Oferecer carona" },
  MyRides: { active: "car-sport", inactive: "car-sport-outline", label: "Minhas caronas" },
  Safety: { active: "shield-checkmark", inactive: "shield-checkmark-outline", label: "Segurança" },
  Profile: { active: "person-circle", inactive: "person-circle-outline", label: "Perfil" },
};

export function MainTabs() {
  const wide = useWideLayout();

  return (
    <Tab.Navigator
      tabBar={wide ? (props) => <DesktopSidebar {...props} items={tabItems} /> : undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarPosition: wide ? "left" : "bottom",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          marginTop: 2,
        },
        tabBarItemStyle: {
          borderRadius: 18,
        },
        tabBarStyle: {
          backgroundColor: "rgba(255,255,255,0.97)",
          borderRadius: 26,
          borderTopColor: "transparent",
          bottom: 10,
          height: 72,
          left: 12,
          paddingBottom: 8,
          paddingTop: 7,
          position: "absolute",
          right: 12,
          ...shadows.floating,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icon = tabItems[route.name];

          return <Ionicons name={focused ? icon.active : icon.inactive} size={size} color={color} />;
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
