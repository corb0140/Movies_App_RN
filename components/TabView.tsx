import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/services/tmdbApi";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export interface TabViewProps {
  activeTab: string;
}

export default function TabView({ activeTab }: TabViewProps) {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const numColumns = 3;

  useEffect(() => {
    const fetchMovies = async () => {
      let fetchedMovies;
      switch (activeTab) {
        case "Now Playing":
          fetchedMovies = await getNowPlayingMovies();
          break;
        case "Upcoming":
          fetchedMovies = await getUpcomingMovies();
          break;
        case "Top Rated":
          fetchedMovies = await getTopRatedMovies();
          break;
        case "Popular":
          fetchedMovies = await getPopularMovies();
          break;
        default:
          fetchedMovies = [];
      }
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={movies}
        keyExtractor={(item: any) => item.id}
        horizontal={false}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <TouchableOpacity
              onPress={() => {
                router.push(`/details/${item.id}`);
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.movieImage}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  movieItem: {
    flex: 1,
    marginRight: 12,
    marginBottom: 15,
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
