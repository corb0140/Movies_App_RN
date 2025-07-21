import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { getMovieDetails, searchMovie } from "@/services/tmdbApi";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

type movieProps = {
  id: number;
  poster_path: string;
};

type movieDetailsProps = {
  id: number;
  title: string;
  release_date: string;
  popularity: number;
  runtime: number;
  genres: { id: number; name: string }[];
};

export default function Search() {
  const route = useRoute() as { params: { query: string } };
  const { query } = route.params ? route.params : { query: "" };

  const [results, setResults] = useState<movieProps[]>([]);
  const [movieDetails, setMovieDetails] = useState<movieDetailsProps[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setMovieDetails([]);
        return;
      }

      const movies = await searchMovie(query);
      setResults(movies);

      const details = await Promise.all(
        movies.map((movie: movieProps) => getMovieDetails(movie.id))
      );

      setMovieDetails(details);
    };

    fetchResults();
  }, [query]);

  const movieDetailsMap = Object.fromEntries(
    movieDetails.map((movie) => [movie.id, movie])
  );

  if (results.length === 0) {
    return (
      <View style={styles.container}>
        <SearchBar />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("@/assets/images/popcorn.png")}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
            }}
          />
          <Text style={[styles.text, { fontSize: 14 }]}>Search For Movies</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar />

      <View style={styles.flatList}>
        <FlatList
          data={results}
          keyExtractor={(movie) => movie.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.image}
              />

              <View style={styles.movieInfoContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>
                    {movieDetailsMap[item.id]?.title || "Loading..."}
                  </Text>
                </View>

                <View>
                  <View style={styles.info}>
                    <Ionicons
                      name="star-outline"
                      size={16}
                      color={Colors.brightOrange}
                    />
                    <Text style={styles.popularityText}>
                      {movieDetailsMap[item.id]?.popularity.toFixed(2) ??
                        "0.00"}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Ionicons name="ticket-outline" size={16} color="#fff" />
                    <Text style={styles.text}>
                      {movieDetailsMap[item.id]?.genres
                        .map((genre) => genre.name)
                        .splice(0, 2)
                        .join(" ") ?? "N/A"}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Ionicons name="calendar-outline" size={16} color="#fff" />
                    <Text style={styles.text}>
                      {movieDetailsMap[item.id]?.release_date ?? "N/A"}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Ionicons name="time-outline" size={16} color="#fff" />
                    <Text style={styles.text}>
                      {movieDetailsMap[item.id]?.runtime ?? "N/A"} minutes
                    </Text>
                  </View>
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
    paddingHorizontal: 34,
  },
  flatList: {
    flex: 1,
    paddingVertical: 40,
    width: "100%",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: "100%",
    marginRight: 15,
    borderRadius: 10,
  },
  movieInfoContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    maxWidth: "70%",
  },
  text: {
    color: "#fff",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
  popularityText: {
    color: Colors.brightOrange,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
