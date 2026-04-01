import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const choices = ["Rock", "Paper", "Scissors"];

export default function RockPaperScissorsScreen({ navigation }) {
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  const getResult = (player, computer) => {
    if (player === computer) return "Draw";

    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      return "You Win!";
    }

    return "You Lose!";
  };

  const handleChoice = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * 3)];

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);

    const gameResult = getResult(choice, randomChoice);
    setResult(gameResult);
  };

  const resetGame = () => {
    setResult("");
    setPlayerChoice("");
    setComputerChoice("");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Rock Paper Scissors</Text>

      <View style={styles.buttonContainer}>
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice}
            style={styles.choiceBtn}
            onPress={() => handleChoice(choice)}
          >
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {playerChoice !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>You: {playerChoice}</Text>
          <Text style={styles.resultText}>CPU: {computerChoice}</Text>
          <Text style={styles.finalResult}>{result}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

    </View>
  );
}

// Temporary Styles for the RPS screen will be adjusted later to match our UI mockups !!

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  choiceBtn: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
  },
  choiceText: {
    color: "white",
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
  },
  finalResult: {
    marginTop: 10,
    fontSize: 22,
    color: "#FFD700",
    fontWeight: "bold",
  },
  resetBtn: {
    marginTop: 30,
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetText: {
    color: "white",
    fontSize: 16,
  },
  backBtn: {
    marginTop: 15,
  },
  backText: {
    color: "#888",
  },
});