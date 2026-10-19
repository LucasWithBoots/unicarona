import { Platform, useWindowDimensions, ViewStyle } from "react-native";

const WIDE_BREAKPOINT = 1024;

// Layout de desktop: só na web, em janelas largas. No app nativo nada muda.
export function useWideLayout() {
  const { width } = useWindowDimensions();
  return Platform.OS === "web" && width >= WIDE_BREAKPOINT;
}

export function wideColumn(maxWidth: number): ViewStyle {
  return { alignSelf: "center", maxWidth, width: "100%" };
}
