import "dotenv/config";

export default {
  expo: {
    name: "MoviesApp",
    slug: "MoviesApp",
    version: "1.0.0",
    owner: "kolizak",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "moviesapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_KEY: process.env.API_KEY,
      API_URL: process.env.API_URL,
      eas: {
        projectId: "8f03fd4b-9a97-4731-8f49-ab56be8e2a78",
      },
    },
  },
};
