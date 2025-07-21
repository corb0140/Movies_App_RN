import SearchBar from "@/components/SearchBar";
import { searchMovie } from "@/services/tmdbApi";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

type movieProps = {
  id: string;
  title: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  genre_ids: number[];
};

export default function Search() {
  const route = useRoute() as { params: { query: string } };
  const { query } = route.params;
  const [results, setResults] = useState<movieProps[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setResults(await searchMovie(query));
      } else {
        console.warn("Search query is empty");
      }
    };

    fetchResults();
  }, [query]);

  return (
    <View style={styles.container}>
      <SearchBar />

      <View style={styles.flatList}>
        <FlatList
          data={results}
          keyExtractor={(movie) => movie.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.image}
              />

              <View style={styles.movieInfoContainer}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>Popularity: {item.popularity}</Text>
                  <Text style={styles.text}>{item.release_date}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  flatList: {
    flex: 1,
    paddingVertical: 40,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
  },
  movieInfoContainer: {
    flex: 1,
    gap: 25,
  },
  title: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
});
