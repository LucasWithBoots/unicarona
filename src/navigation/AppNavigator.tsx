import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ActiveTripScreen } from "../screens/ActiveTripScreen";
import { FiltersScreen } from "../screens/FiltersScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { OfferReviewScreen } from "../screens/OfferReviewScreen";
import { ReceivedRequestsScreen } from "../screens/ReceivedRequestsScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RequestConfirmedScreen } from "../screens/RequestConfirmedScreen";
import { RideDetailsScreen } from "../screens/RideDetailsScreen";
import { TripReviewScreen } from "../screens/TripReviewScreen";
import { VerificationScreen } from "../screens/VerificationScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { colors } from "../theme";
import { MainTabs } from "./MainTabs";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontSize: 17, fontWeight: "900" },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Filters" component={FiltersScreen} options={{ title: "Filtros" }} />
        <Stack.Screen
          name="RideDetails"
          component={RideDetailsScreen}
          options={{ title: "Detalhes da carona" }}
        />
        <Stack.Screen
          name="RequestConfirmed"
          component={RequestConfirmedScreen}
          options={{ title: "Solicitação confirmada" }}
        />
        <Stack.Screen
          name="OfferReview"
          component={OfferReviewScreen}
          options={{ title: "Revisão da oferta" }}
        />
        <Stack.Screen
          name="ReceivedRequests"
          component={ReceivedRequestsScreen}
          options={{ title: "Solicitações recebidas" }}
        />
        <Stack.Screen
          name="ActiveTrip"
          component={ActiveTripScreen}
          options={{ title: "Viagem em andamento" }}
        />
        <Stack.Screen
          name="TripReview"
          component={TripReviewScreen}
          options={{ title: "Avaliação da viagem" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
