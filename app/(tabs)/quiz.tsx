import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const quizzes: { id: number; title: string; borderColor: string }[] = [
  { id: 1, title: "Anime", borderColor: Colors.primary },
  { id: 2, title: "Directors", borderColor: Colors.brightOrange },
  { id: 3, title: "Music", borderColor: "red" },
  { id: 4, title: "Movies", borderColor: "lightgreen" },
  { id: 5, title: "TV Shows", borderColor: "yellow" },
  { id: 6, title: "Actors", borderColor: Colors.brightPink },
];

export default function Quiz() {
  const router = useRouter();

  const handleQuizPress = (title: string) => {
    router.push(`/quiz/${title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a Quiz</Text>

      <View style={styles.quizContainer}>
        {quizzes.map((quiz) => (
          <TouchableOpacity
            onPress={() => handleQuizPress(quiz.title)}
            key={quiz.id}
            style={[styles.quizItem, { borderColor: quiz.borderColor }]}
          >
            <Text style={styles.text}>{quiz.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.secondary,
    paddingTop: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
    color: Colors.text,
  },
  quizContainer: {
    flex: 1,
    gap: 15,
    marginTop: 50,
    width: "80%",
  },
  quizItem: {
    padding: 15,
    borderWidth: 3,
    borderRadius: 10,
  },
});
