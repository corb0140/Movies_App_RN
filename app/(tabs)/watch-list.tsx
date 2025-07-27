import {
  getWatchList,
  removeMovieFromWatchList,
} from "@/constants/AsyncStorage";
import { Colors } from "@/constants/Colors";
import { getMovieDetails } from "@/services/tmdbApi";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import { ExtendedMovieDetailsProps } from "../details/[id]";

export default function WatchListScreen() {
  const [watchList, setWatchList] = useState<ExtendedMovieDetailsProps[]>([]);

  const slideAim = useRef(useAnimatedValue(0)).current;

  // FETCH WATCH LIST ON MOUNT & ANIMATE SLIDE IN
  useFocusEffect(
    useCallback(() => {
      const fetchWatchList = async () => {
        const list = await getWatchList("watch-list");

        const details = await Promise.all(
          list.map((movie: ExtendedMovieDetailsProps) =>
            getMovieDetails(movie.id)
          )
        );
        setWatchList(details);
      };

      fetchWatchList();

      Animated.timing(slideAim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(slideAim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      };
    }, [slideAim])
  );

  // REMOVE MOVIE FROM WATCH LIST
  const handleRemoveMovie = async (id: number) => {
    await removeMovieFromWatchList("watch-list", id);
    const updatedList = await getWatchList("watch-list");
    const updatedDetails = await Promise.all(
      updatedList.map((movie: ExtendedMovieDetailsProps) =>
        getMovieDetails(movie.id)
      )
    );

    setWatchList(updatedDetails);
  };

  // CONFIRM REMOVE MOVIE FROM WATCH LIST
  const confirmRemoveMovie = (id: number) => {
    Alert.alert(
      "Remove Movie",
      "Are you sure you want to remove this movie from your watch list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => handleRemoveMovie(id),
        },
      ],
      { cancelable: true }
    );
  };

  const movieDetailsMap = Object.fromEntries(
    watchList.map((movie) => [movie.id, movie])
  );

  // SHOW EMPTY STATE IF WATCH LIST IS EMPTY
  if (watchList.length === 0) {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("@/assets/images/magic-box.png")}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
            }}
          />
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "MontserratSemiBold",
                },
              ]}
            >
              There Is No Movie Yet!
            </Text>
            <Text
              style={{
                marginTop: 10,
                color: "#fff",
                fontSize: 12,
                textAlign: "center",
                fontFamily: "MontserratMedium",
              }}
            >
              Add Movie To Your Watch List by Clicking The Bookmark Icon on
              Movie Details Page
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={watchList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* POSTER */}
              {item.poster_path ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require("@/assets/images/no-poster.jpg")}
                  style={styles.image}
                />
              )}

              {/* MOVIE INFORMATION */}
              <View style={styles.movieInfoContainer}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {/* TITLE */}
                  <Text style={styles.title}>
                    {movieDetailsMap[item.id]?.title || "Loading..."}
                  </Text>

                  {/* DELETE BUTTON */}
                  <Animated.View
                    onTouchEnd={() => confirmRemoveMovie(item.id)}
                    style={[
                      styles.deleteButton,
                      {
                        opacity: slideAim,
                        transform: [
                          {
                            translateX: slideAim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [50, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Ionicons name="trash-outline" size={14} color="#fff" />
                  </Animated.View>
                </View>

                <View>
                  {/* RATING */}
                  <View style={styles.info}>
                    <Ionicons
                      name="star-outline"
                      size={16}
                      color={Colors.brightOrange}
                    />
                    <Text style={styles.ratingText}>
                      {movieDetailsMap[item.id]?.vote_average.toFixed(2) ??
                        "0.00"}
                    </Text>
                  </View>

                  {/* GENRES */}
                  <View style={styles.info}>
                    <Ionicons name="ticket-outline" size={16} color="#fff" />
                    <Text style={styles.text}>
                      {movieDetailsMap[item.id]?.genres
                        .map((genre) => genre.name)
                        .splice(0, 2)
                        .join(" ") || "N/A"}
                    </Text>
                  </View>

                  {/* RELEASE DATE */}
                  <View style={styles.info}>
                    <Ionicons name="calendar-outline" size={16} color="#fff" />
                    <Text style={styles.text}>
                      {movieDetailsMap[item.id]?.release_date || "N/A"}
                    </Text>
                  </View>

                  {/* RUNTIME */}
                  <View style={styles.info}>
                    <Ionicons name="time-outline" size={16} color="#fff" />
                    <Text style={styles.text}>
                      {movieDetailsMap[item.id]?.runtime
                        ? `${movieDetailsMap[item.id]?.runtime} minutes`
                        : "N/A"}
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
    paddingHorizontal: 34,
  },
  flatList: {
    flex: 1,
    marginTop: 20,
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
  ratingText: {
    color: Colors.brightOrange,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});
