import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TabBar from "./TabBar";
import TabView from "./TabView";

export default function MovieTabsView() {
  const [activeTab, setActiveTab] = useState("Now Playing");

  return (
    <SafeAreaView style={styles.container}>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <TabView activeTab={activeTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
