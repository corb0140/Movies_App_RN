import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

export default function SliderCard({ cardNumber }: { cardNumber: number }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}></View>
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
    borderColor: "#fff",
    borderRadius: 16,
  },
  cardNumber: {
    position: "absolute",
    bottom: -45,
    left: -20,
  },
});
