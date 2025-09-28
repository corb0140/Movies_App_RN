import { Colors } from "@/constants/Colors";
import {
  actors,
  anime,
  directors,
  movies,
  music,
  tvShows,
} from "@/data/questions";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Question() {
  const route = useRoute() as { params: { type: string } };
  const { type } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [countdown, setCountdown] = useState(20);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const timer_duration = 20;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    switch (type) {
      case "Actors":
        setQuestions(actors);
        break;
      case "Anime":
        setQuestions(anime);
        break;
      case "Directors":
        setQuestions(directors);
        break;
      case "Music":
        setQuestions(music);
        break;
      case "Movies":
        setQuestions(movies);
        break;
      case "TV Shows":
        setQuestions(tvShows);
        break;
      default:
        setQuestions([]);
    }
  }, [type]);

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      clearTimeout(timerRef.current!);

      setCountdown(timer_duration);

      timerRef.current = setTimeout(() => {
        setCountdown(0);
        moveToNextQuestion();
      }, timer_duration * 1000);

      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentQuestionIndex, questions]);

  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.finishedTextTitle}>Quiz Finished!</Text>
        <Text style={styles.finishedTextSubtitle}>
          Thank you for participating in the {type} quiz.
        </Text>
        <Text style={styles.scoreText}>
          You got {score} out of {questions.length} correct!
        </Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const moveToNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerRevealed) return;

    setSelectedOption(option);
    setIsAnswerRevealed(true);

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{type} Quiz</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {Object.values(currentQuestion.options).map((option, idx) => {
          let borderColor = "transparent";

          if (isAnswerRevealed) {
            if (option === currentQuestion.answer) {
              borderColor = "green";
            } else if (
              option === selectedOption &&
              option !== currentQuestion.answer
            ) {
              borderColor = "red";
            }
          }

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.optionButton,
                {
                  borderColor,
                  borderWidth: borderColor !== "transparent" ? 2 : 0,
                },
              ]}
              onPress={() => handleOptionSelect(option as string)}
              disabled={isAnswerRevealed} // prevent pressing again
            >
              <Text style={styles.optionText}>{option as string}</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.timerText}>You have {countdown} seconds</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
  },
  questionContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    width: "90%",
  },
  questionText: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: Colors.darkGreyishBlue,
    padding: 12,
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  optionText: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    color: Colors.text,
  },
  timerText: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
    fontFamily: "PoppinsRegular",
  },
  finishedTextTitle: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginTop: 20,
    color: Colors.secondary,
  },
  finishedTextSubtitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    textAlign: "center",
    marginTop: 20,
    color: Colors.secondary,
  },
  scoreText: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginTop: 30,
    color: Colors.primary,
  },
});
