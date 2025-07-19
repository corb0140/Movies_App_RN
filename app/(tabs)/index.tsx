import SearchBar from "@/components/SearchBar";
import Slider from "@/components/Slider";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Text style={styles.headerText}>What do you want to watch?</Text>

        <SearchBar />

        <Slider />

        {/* Additional content can be added here */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 20,
  },
  headerText: {
    color: Colors.text,
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
  },
});
