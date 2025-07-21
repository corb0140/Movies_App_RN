import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tabs = ["Now Playing", "Upcoming", "Top Rated", "Popular"];

export interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {Tabs.map((tab, index) => (
        <View key={index} style={styles.tabsView}>
          <TouchableOpacity onPress={() => onTabChange(tab)}>
            <Text
              style={[
                styles.tabText,
                tab === activeTab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 10,
  },
  tabsView: {
    paddingBottom: 10,
    marginRight: 15,
  },
  tabText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },
  activeTabText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
});
