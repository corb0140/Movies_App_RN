import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import { MoviePoster } from "./Slider";

export default function SliderCard({
  cardNumber,
  data,
}: {
  cardNumber: number;
  data: MoviePoster;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {data && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
            }}
            style={{ width: "100%", height: "100%", borderRadius: 16 }}
            contentFit="cover"
          />
        )}
      </View>
      <Svg style={styles.cardNumber} width="150" height="120">
        <SvgText
          x="20%"
          y="40%"
          fill={Colors.secondary}
          fontSize="96"
          fontFamily="MontserratSemiBold"
          stroke={Colors.primary}
          strokeWidth="2"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {cardNumber}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 32,
    position: "relative",
  },
  card: {
    width: 144,
    height: 210,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 16,
  },
  cardNumber: {
    position: "absolute",
    bottom: -45,
    left: -20,
  },
});
