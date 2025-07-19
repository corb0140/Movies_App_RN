import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import SliderCard from "./SliderCard";

export default function Slider() {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {[1, 2, 3, 4, 5].map((item, index) => (
        <SliderCard key={item} cardNumber={index + 1} />
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
