import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const choices = [
  { name: "Rock", icon: "🪨" },
  { name: "Paper", icon: "📄" },
  { name: "Scissors", icon: "✂️" }
];

export default function RockPaperScissorsScreen({ navigation }) {
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);

  const getResult = (player, cpu) => {
    if (player === cpu) return "Draw";

    if (
      (player === "Rock" && cpu === "Scissors") ||
      (player === "Paper" && cpu === "Rock") ||
      (player === "Scissors" && cpu === "Paper")
    ) {
      return "You Win!";
    }

    return "You Lose!";
  };

  const handleChoice = (choiceName) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const cpuSelected = choices[randomIndex].name;

    setPlayerChoice(choiceName);
    setCpuChoice(cpuSelected);

    setResult(getResult(choiceName, cpuSelected));
  };

  const resetGame = () => {
    setResult("");
    setPlayerChoice(null);
    setCpuChoice(null);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Rock Paper Scissors</Text>

      <View style={styles.buttonContainer}>
        {choices.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.choiceBtn}
            onPress={() => handleChoice(item.name)}
          >
            <Text style={styles.choiceIcon}>{item.icon}</Text>
            <Text style={styles.choiceText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {playerChoice && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            You: {playerChoice}
          </Text>
          <Text style={styles.resultText}>
            CPU: {cpuChoice}
          </Text>

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
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  choiceBtn: {
    backgroundColor: "#2e2e2e",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  choiceIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  choiceText: {
    color: "white",
    fontSize: 15,
  },
  resultContainer: {
    marginTop: 35,
    alignItems: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
    marginBottom: 4,
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
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetText: {
    color: "white",
    fontSize: 16,
  },
  backBtn: {
    marginTop: 18,
  },
  backText: {
    color: "#999",
  },
});