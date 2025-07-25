import { Colors } from "@/constants/Colors";
import { getMovieDetails } from "@/services/tmdbApi";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { movieDetailsProps } from "./(tabs)/search";

type ExtendedMovieDetailsProps = movieDetailsProps & {
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  reviews: [];
  cast: { name: string; character: string; profile_path: string }[];
};

export default function Details() {
  const router = useRoute() as { params: { id: number } };
  const { id } = router.params ? router.params : { id: null };
  const [movieDetails, setMovieDetails] = useState<ExtendedMovieDetailsProps>({
    id: 0,
    poster_path: "",
    backdrop_path: "",
    title: "",
    release_date: "",
    popularity: 0,
    vote_average: 0,
    runtime: 0,
    genres: [],
    overview: "",
    reviews: [],
    cast: [],
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      const details = await getMovieDetails(id);
      setMovieDetails(details);
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`,
            }}
            style={styles.image}
          />

          <View style={styles.posterAndNameContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
              }}
              style={{ width: 120, height: "100%", borderRadius: 16 }}
            />

            <Text
              style={{
                color: Colors.text,
                fontFamily: "PoppinsSemiBold",
                fontSize: 18,
                alignSelf: "flex-end",
                width: 230,
              }}
            >
              {movieDetails.title}
            </Text>
          </View>

          <View style={styles.popularityContainer}>
            <Ionicons
              name="star-outline"
              size={16}
              color={Colors.brightOrange}
            />

            <Text style={styles.popularityText}>
              {movieDetails.vote_average.toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 150,
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View style={styles.movieDateTimeGenreContainer}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors.lightGrey}
            />
            <Text style={styles.movieDateTimeGenreText}>
              {movieDetails.release_date}
            </Text>
          </View>

          <View
            style={{ borderRightWidth: 1, borderColor: Colors.lightGrey }}
          ></View>

          <View style={styles.movieDateTimeGenreContainer}>
            <Ionicons name="time-outline" size={16} color={Colors.lightGrey} />
            <Text style={styles.movieDateTimeGenreText}>
              {movieDetails.runtime} minutes
            </Text>
          </View>

          <View
            style={{ borderRightWidth: 1, borderColor: Colors.lightGrey }}
          ></View>

          <View style={styles.movieDateTimeGenreContainer}>
            <Ionicons name="film-outline" size={16} color={Colors.lightGrey} />
            <Text style={styles.movieDateTimeGenreText}>
              {movieDetails.genres
                .map((genre) => genre.name)
                .splice(0, 1)
                .join(", ")}
            </Text>
          </View>
        </View>
        <Text></Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
  },
  bannerContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    height: 210,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  posterAndNameContainer: {
    position: "absolute",
    bottom: -95,
    left: 40,
    flexDirection: "row",
    gap: 10,

    width: 250,
    height: 180,
  },
  popularityContainer: {
    flexDirection: "row",
    gap: 5,
    position: "absolute",
    bottom: 10,
    right: 20,
    backgroundColor: Colors.darkGreyishBlue32Opac,
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  popularityText: {
    color: Colors.brightOrange,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  movieDateTimeGenreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  movieDateTimeGenreText: {
    color: Colors.lightGrey,
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
});
