import { ApiConstants, ApiEndpoints } from "@/constants/Api";
import axios from "axios";

const { API_URL, API_KEY } = ApiConstants;

const tmdb = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export async function getPopularMovies() {
  try {
    const res = await tmdb.get(ApiEndpoints.POPULAR_MOVIES);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

export async function getTopRatedMovies() {
  try {
    const res = await tmdb.get(ApiEndpoints.TOP_RATED_MOVIES);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
}

export async function getUpcomingMovies() {
  try {
    const res = await tmdb.get(ApiEndpoints.UPCOMING_MOVIES);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
}

export async function getNowPlayingMovies() {
  try {
    const res = await tmdb.get(ApiEndpoints.NOW_PLAYING_MOVIES);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching now-playing movies:", error);
    return [];
  }
}

export async function searchMovie(query: string) {
  try {
    const res = await tmdb.get(ApiEndpoints.SEARCH_MOVIE, {
      params: { query },
    });
    return res.data.results;
  } catch (error) {
    console.error(`Error searching movie with query "${query}":`, error);
    return [];
  }
}

export async function getMovieDetails(movieId: number) {
  try {
    const res = await tmdb.get(`${ApiEndpoints.MOVIE_DETAILS}/${movieId}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
}

export async function getMovieCredits(movieId: number) {
  try {
    const res = await tmdb.get(
      `${ApiEndpoints.MOVIE_DETAILS}/${movieId}${ApiEndpoints.MOVIE_CREDITS}`
    );
    return res.data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    return [];
  }
}

export async function getMovieReviews(movieId: number) {
  try {
    const res = await tmdb.get(
      `${ApiEndpoints.MOVIE_DETAILS}/${movieId}${ApiEndpoints.MOVIE_REVIEWS}`
    );
    return res.data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    return [];
  }
}
