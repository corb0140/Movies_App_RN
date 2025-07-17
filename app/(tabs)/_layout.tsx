import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0296E5",
        headerStyle: { backgroundColor: "#242A32" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#242A32" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Movies App",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search-sharp" : "search-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="watch-list"
        options={{
          headerTitle: "Watch List",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "bookmark-sharp" : "bookmark-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
