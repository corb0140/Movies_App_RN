import { Colors } from "@/constants/Colors";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieReviews,
} from "@/services/tmdbApi";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export interface TabViewProps {
  id: number;
  activeTab: string;
}

interface Review {
  content: string;
  author_details: {
    username: string;
    avatar_path: string;
    rating: number;
  };
}

interface Cast {
  name: string;
  profile_path: string;
}

export default function TabView({ activeTab, id }: TabViewProps) {
  const [overview, setOverview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cast, setCast] = useState<Cast[]>([]);
  const numColumns = 2;

  useEffect(() => {
    const fetchMovies = async () => {
      switch (activeTab) {
        case "About Movie":
          const movieResults = await getMovieDetails(id);
          setOverview(movieResults.overview);
          break;
        case "Cast":
          const castResults = await getMovieCredits(id);
          setCast(castResults);
          break;
        case "Reviews":
          const reviewResults = await getMovieReviews(id);
          setReviews(reviewResults);
          break;
        default:
          setOverview("");
          setReviews([]);
          setCast([]);
          break;
      }
    };

    fetchMovies();
  }, [activeTab, id]);

  return (
    <View style={styles.container}>
      {activeTab === "About Movie" ? (
        <Text style={styles.text}>
          {overview ? overview : "No overview available."}
        </Text>
      ) : activeTab === "Reviews" ? (
        <View>
          {reviews.length > 0 ? (
            <FlatList
              data={reviews}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.reviewsContainer}>
                  <View style={styles.reviewImageAndRating}>
                    {item.author_details.avatar_path ? (
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500/${item.author_details.avatar_path}`,
                        }}
                        style={styles.reviewImage}
                      />
                    ) : (
                      <Image
                        source={require("@/assets/images/no-avatar.png")}
                        style={styles.reviewImage}
                      />
                    )}

                    {item.author_details.rating && (
                      <Text style={[styles.text, { color: Colors.primary }]}>
                        {item.author_details.rating}
                      </Text>
                    )}
                  </View>

                  <View style={styles.reviewNameAndReview}>
                    <Text style={styles.text}>
                      {item.author_details.username}
                    </Text>

                    <Text style={styles.text}>{item.content}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.text}>No reviews available.</Text>
          )}
        </View>
      ) : (
        activeTab === "Cast" && (
          <FlatList
            data={cast}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <View style={styles.castItem}>
                <View style={styles.castImageContainer}>
                  {item.profile_path ? (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                      }}
                      style={styles.castImage}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/no-avatar.png")}
                      style={styles.castImage}
                    />
                  )}
                </View>

                <Text style={styles.text}>{item.name}</Text>
              </View>
            )}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  reviewsContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },
  reviewImageAndRating: {
    width: 80,
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  reviewNameAndReview: {
    flex: 1,
    marginLeft: 10,
  },
  castItem: {
    flex: 1,
    marginBottom: 15,
    alignItems: "flex-start",
  },
  castImageContainer: {
    width: 100,
    height: 100,
    borderRadius: "100%",
    overflow: "hidden",
    marginBottom: 5,
  },
  castImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },
});
