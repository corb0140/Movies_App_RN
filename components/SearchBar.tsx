import { Colors } from "@/constants/Colors";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchBar() {
  const { searchQuery, handleSearchChange } = useSearchQuery();
  const router = useRouter();

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      return router.push(`/search?query=${encodeURIComponent(query)}`);
    } else {
      console.warn("Search query is empty");
      return [];
    }
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearchChange}
        value={searchQuery}
        placeholder="Search"
        placeholderTextColor={Colors.lightGrey}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
        <Ionicons name="search" size={16} color={Colors.lightGrey} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.darkGreyishBlue,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 16,
    height: 45,
    width: 327,
    paddingHorizontal: 10,
  },
  input: {
    color: Colors.primary,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    flex: 1,
    textAlignVertical: "center",
    paddingTop: 4,
    paddingBottom: 0,
  },
});
