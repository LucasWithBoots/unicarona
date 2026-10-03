import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppDataProvider } from "./src/context/AppDataContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

SplashScreen.setOptions({ duration: 400, fade: true });

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppDataProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </AppDataProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
