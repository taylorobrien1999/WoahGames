import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@woahgames/rps_stats';

const choices = [
  { name: "Rock", icon: "🪨" },
  { name: "Paper", icon: "📄" },
  { name: "Scissors", icon: "✂️" }
];

export default function RockPaperScissorsScreen({ navigation }) {
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });

  // Load saved stats
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load RPS stats:', e);
    }
  };

  const saveStats = async (updatedStats) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
    } catch (e) {
      console.error('Failed to save RPS stats:', e);
    }
  };

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

    const outcome = getResult(choiceName, cpuSelected);
    setResult(outcome);

    // Update stats
    const updatedStats = { ...stats };
    if (outcome === "You Win!") updatedStats.wins += 1;
    else if (outcome === "You Lose!") updatedStats.losses += 1;
    else updatedStats.draws += 1;

    setStats(updatedStats);
    saveStats(updatedStats);
  };

  const resetGame = () => {
    setResult("");
    setPlayerChoice(null);
    setCpuChoice(null);
  };

  const resetStats = async () => {
    const cleared = { wins: 0, losses: 0, draws: 0 };
    setStats(cleared);
    await AsyncStorage.removeItem(STORAGE_KEY);
    resetGame();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rock Paper Scissors</Text>

      {/* Persistent stat cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.wins}</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.draws}</Text>
          <Text style={styles.statLabel}>Draws</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.losses}</Text>
          <Text style={styles.statLabel}>Losses</Text>
        </View>
      </View>

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
          <Text style={styles.resultText}>You: {playerChoice}</Text>
          <Text style={styles.resultText}>CPU: {cpuChoice}</Text>
          <Text style={styles.finalResult}>{result}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Round</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={resetStats}>
        <Text style={styles.resetText}>Reset Stats</Text>
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
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    minWidth: 80,
  },
  statNumber: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
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
    marginTop: 18,
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