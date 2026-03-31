import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TicTacToeScreen({ navigation }) {
  const emptyBoard = ["", "", "", "", "", "", "", "", ""];
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],     // rows
    [0,3,6], [1,4,7], [2,5,8],     // columns
    [0,4,8], [2,4,6]               // diagonals
  ];

  const handlePress = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    checkWinner(newBoard);

    setTurn(turn === "X" ? "O" : "X");
  };

  const checkWinner = (b) => {
    for (let pattern of winPatterns) {
      const [a, c, d] = pattern;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        setWinner(b[a]);
        return;
      }
    }

    if (!b.includes("")) {
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setTurn("X");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Tic Tac Toe</Text>

      {winner && (
        <Text style={styles.winnerText}>
          {winner === "draw" ? "It's a Draw!" : `${winner} Wins!`}
        </Text>
      )}

      <View style={styles.grid}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

    </View>
  );
}

// Temporary Styles for the Tic Tac Toe screen will be adjusted later to match our UI mockups !!

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
  winnerText: {
    fontSize: 24,
    color: "#FFD700",
    marginBottom: 15,
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 38,
    color: "white",
    fontWeight: "bold",
  },
  resetBtn: {
    marginTop: 30,
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetText: {
    color: "white",
    fontSize: 18,
  },
  backBtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  backText: {
    color: "#888",
    fontSize: 16,
  },
});