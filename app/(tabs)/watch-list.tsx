import { Text, View, StyleSheet } from "react-native";

export default function WatchListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Watch List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
