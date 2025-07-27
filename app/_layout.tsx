import {
  getWatchList,
  removeMovieFromWatchList,
  storeMovieInWatchList,
} from "@/constants/AsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true); // Ignore all log notifications

export default function RootLayout() {
  const { id } = useGlobalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const checkBookmark = async () => {
      const watchList = await getWatchList("watch-list");
      const bookmarked = watchList.some((movie: any) => movie.id === id);
      setIsBookmarked(bookmarked);
      console.log("Bookmark status:", watchList, bookmarked);
    };

    checkBookmark();
    console.log("RootLayout mounted with id:", id);
  }, [id]);

  const toggleBookmark = async () => {
    if (!id) return;

    if (isBookmarked) {
      await removeMovieFromWatchList("watch-list", id);
      setIsBookmarked(false);
    } else {
      const movie = { id };
      await storeMovieInWatchList("watch-list", movie);
      setIsBookmarked(true);
    }
  };

  const [fontsLoaded] = useFonts({
    // Poppins fonts
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),

    // Montserrat fonts
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
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
          name="details/[id]"
          options={{
            title: "Movie Details",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#242A32",
            },
            headerTintColor: "#fff",
            headerRight: () => {
              return (
                <Ionicons
                  name={isBookmarked ? "bookmark-sharp" : "bookmark-outline"}
                  size={24}
                  color="#fff"
                  onPress={toggleBookmark}
                />
              );
            },
          }}
        />

        <Stack.Screen
          name="+not-found"
          options={{ title: "Not Found", headerShown: false }}
        />
      </Stack>
    </>
  );
}
