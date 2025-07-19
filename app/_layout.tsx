import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";

LogBox.ignoreAllLogs(true); // Ignore all log notifications

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Wait for fonts to load
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="+not-found"
          options={{ title: "Not Found", headerShown: false }}
        />
      </Stack>
    </>
  );
}
