import { Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Text style={styles.headerText}>What do you want to watch?</Text>

        <SearchBar />
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
  },
  headerText: {
    color: Colors.text,
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
  },
});
