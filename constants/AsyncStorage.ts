import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeMovieInWatchList = async (key: string, value: any) => {
  try {
    const existingMovie = await AsyncStorage.getItem(key);
    let watchList: any[] = [];

    if (existingMovie) {
      const parsedList = JSON.parse(existingMovie);

      if (Array.isArray(parsedList)) {
        watchList = parsedList;
      }
    }

    // Check if the movie is already in the watch list
    const movieExists = watchList.some((movie: any) => movie.id === value.id);

    if (!movieExists) {
      watchList.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(watchList));
      console.log("Movie stored in watch list");
    } else {
      console.log("Movie already exists in watch list");
    }
  } catch (err) {
    console.error("Error storing data", err);
  }
};

export const getWatchList = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch (err) {
    console.error("Error retrieving data", err);
    return [];
  }
};

export const removeMovieFromWatchList = async (key: string, id: any) => {
  try {
    const storedList = await AsyncStorage.getItem(key);
    if (!storedList) return;

    const parsedList = JSON.parse(storedList);
    const filteredList = parsedList.filter((movie: any) => movie.id !== id);

    await AsyncStorage.setItem(key, JSON.stringify(filteredList));
    console.log("Movie removed from watch list");
  } catch (err) {
    console.error("Error removing movie from watch list", err);
  }
};
