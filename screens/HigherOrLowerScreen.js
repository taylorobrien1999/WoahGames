import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@woahgames/hol_stats';

export default function HigherOrLowerScreen({ navigation }) {

  // Standard card values (2–10, Jack, Queen, King, Ace)
  const cardValues = [2,3,4,5,6,7,8,9,10,11,12,13,14];

  const createDeck = () => {
    const deck = [];
    for (let i = 0; i < 4; i++) {
      deck.push(...cardValues);
    }
    return shuffle(deck);
  };

  const shuffle = (arr) => {
    const temp = [...arr];
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp;
  };

  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [nextCard, setNextCard] = useState(null);
  const [result, setResult] = useState("");

  // set score and best score
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          setBestScore(parsed.bestScore || 0);
        }
      } catch (e) {
        console.error('Failed to load H.O.L stats:', e);
      }
      const newDeck = createDeck();
      setDeck(newDeck);
      setCurrentCard(newDeck[0]);
    };
    init();
  }, []);

  const saveBestScore = async (newBest) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ bestScore: newBest }));
    } catch (e) {
      console.error('Failed to save H.O.L stats:', e);
    }
  };

  const handleGuess = (guess) => {
    if (deck.length < 2) return;

    const next = deck[1];
    setNextCard(next);

    let isCorrect = false;

    if (guess === "higher" && next > currentCard) isCorrect = true;
    if (guess === "lower" && next < currentCard) isCorrect = true;
    if (next === currentCard) {
      setResult("Same Value!");
      isCorrect = false;
    }

    if (isCorrect) {
      setResult("Correct!");

      // Increase score on correct guess
      const newScore = score + 1;
      setScore(newScore);

      // Update best score if current score exceeds it
      if (newScore > bestScore) {
        setBestScore(newScore);
        saveBestScore(newScore);
      }

    } else {
      setResult("Wrong!");

      // Resets current score on wrong guess
      setScore(0);
    }

    const updated = deck.slice(1);
    setDeck(updated);
    setCurrentCard(next);

    if (updated.length <= 1) {
      setResult("Deck Finished! Press Reset.");
    }
  };

  const resetGame = () => {
    const fresh = createDeck();
    setDeck(fresh);
    setCurrentCard(fresh[0]);
    setNextCard(null);
    setResult("");
    setScore(0);
  };

  const cardLabel = (val) => {
    if (val === 11) return "J";
    if (val === 12) return "Q";
    if (val === 13) return "K";
    if (val === 14) return "A";
    return val;
  };

 return (
    <View style={styles.container}>
      <Text style={styles.header}>Higher or Lower</Text>

      {/* Score display */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Best: {bestScore}</Text>
      </View>

      {/* Card display */}
      <View style={styles.cardBox}>
        <Text style={styles.cardValue}>
          {currentCard !== null ? cardLabel(currentCard) : "-"}
        </Text>

        {/* Suit cycle */}
        <Text style={styles.suitText}>
          {["♠️", "♥️", "♦️", "♣️"][currentCard % 4]}
        </Text>
      </View>

      {/* Result text */}
      {result !== "" && (
        <Text style={styles.result}>{result}</Text>
      )}

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleGuess("higher")}>
          <Text style={styles.actionText}>Higher ↑</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => handleGuess("lower")}>
          <Text style={styles.actionText}>Lower ↓</Text>
        </TouchableOpacity>
      </View>

      {/* Reset and back */}
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
    backgroundColor: "#111",
    alignItems: "center",
    paddingTop: 55,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
  },

  scoreBox: {
    marginBottom: 15,
    alignItems: "center",
  },

  scoreText: {
    color: "white",
    fontSize: 18,
  },

  cardBox: {
    width: 120,
    height: 160,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: "#1A1A1A",
  },

  cardValue: {
    fontSize: 40,
    color: "white",
  },

  suitText: {
    fontSize: 26,
    marginTop: 4,
  },

  result: {
    fontSize: 22,
    color: "#FFD700",
    marginBottom: 20,
  },

  btnRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },

  actionBtn: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  actionText: {
    color: "white",
    fontSize: 18,
  },

  resetBtn: {
    backgroundColor: "#444",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },

  resetText: {
    color: "white",
    fontSize: 16,
  },

  backBtn: {},

  backText: {
    color: "#888",
    fontSize: 16,
  },
});
