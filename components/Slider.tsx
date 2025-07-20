import { getPopularMovies } from "@/services/tmdbApi";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SliderCard from "./SliderCard";

export type MoviePoster = {
  id: number;
  poster_path: string;
};

export default function Slider() {
  const [movies, setMovies] = useState<MoviePoster[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await getPopularMovies();
      const limitedMovies = popularMovies.slice(0, 5);
      setMovies(
        limitedMovies.map((movie: MoviePoster) => ({
          id: movie.id,
          poster_path: movie.poster_path,
        }))
      );
    };

    fetchMovies();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {movies.map((movie, index) => (
        <SliderCard key={index} cardNumber={index + 1} data={movie} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    padding: 10,
    height: 250,
  },
  text: {
    fontSize: 14,
    color: "#fff",
  },
});
