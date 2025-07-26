import Constants from "expo-constants";

export const ApiConstants = {
  API_KEY: Constants.expoConfig?.extra?.API_KEY || "",
  API_URL:
    Constants.expoConfig?.extra?.API_URL || "https://api.themoviedb.org/3",
};

export const ApiEndpoints = {
  POPULAR_MOVIES: "/movie/popular",
  TOP_RATED_MOVIES: "/movie/top_rated",
  UPCOMING_MOVIES: "/movie/upcoming",
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAILS: "/movie",
  MOVIE_CREDITS: "/credits",
  MOVIE_REVIEWS: "/reviews",
};
