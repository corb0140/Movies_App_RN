import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TabBar from "./TabBar";
import TabView from "./TabView";

export default function DetailsTabsView({ id }: { id: number }) {
  const [activeTab, setActiveTab] = useState("About Movie");

  return (
    <SafeAreaView style={styles.container}>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <TabView activeTab={activeTab} id={id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
