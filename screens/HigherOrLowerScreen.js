import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    const newDeck = createDeck();
    setDeck(newDeck);
    setCurrentCard(newDeck[0]);
  }, []);

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

      // Increase score with each correct guess
      const newScore = score + 1;
      setScore(newScore);

      // Update best score
      if (newScore > bestScore) {
        setBestScore(newScore);
      }

    } else {
      setResult("Wrong!");

      // Resets currentscore on wrong guess
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
    setScore(0); // Resets high score
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

      {/*  Score UI  */}
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>Best Score: {bestScore}</Text>

      <Text style={styles.label}>Current Card:</Text>
      <Text style={styles.card}>
        {currentCard !== null ? cardLabel(currentCard) : "-"}
      </Text>

      {result !== "" && <Text style={styles.result}>{result}</Text>}

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => handleGuess("higher")}>
          <Text style={styles.btnText}>Higher</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => handleGuess("lower")}>
          <Text style={styles.btnText}>Lower</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.reset} onPress={resetGame}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}


// Temporary Styles for the Higher or Lower screen will be adjusted later to match our UI mockups !!

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  scoreText: {
    color: "white",
    fontSize: 18,
    marginBottom: 4,
  },

  label: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 6,
  },
  card: {
    fontSize: 48,
    color: "white",
    marginBottom: 20,
  },
  result: {
    fontSize: 22,
    color: "#FFD700",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  reset: {
    marginTop: 10,
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  resetText: {
    color: "white",
    fontSize: 16,
  },
  back: {
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    color: "#888",
  },
});
