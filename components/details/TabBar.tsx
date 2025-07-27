import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tabs = ["About Movie", "Reviews", "Cast"];

interface TabBarProps {
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
          <View>
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

            <View style={tab === activeTab && styles.activeTabLine}></View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 20,
  },
  tabsView: {
    paddingBottom: 10,
    marginRight: 25,
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
  },
  activeTabLine: {
    marginTop: 5,
    borderBottomWidth: 5,
    borderBottomColor: Colors.darkGreyishBlue,
    borderRadius: 100,
  },
});
