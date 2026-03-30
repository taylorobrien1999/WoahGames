import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>WOAH GAMES</Text>

      <View style={styles.cardContainer}>
        <GameCard title="Tic Tac Toe" onPress={() => navigation.navigate('TicTacToe')} />
        <GameCard title="Rock Paper Scissors" onPress={() => navigation.navigate('RPS')} />
        <GameCard title="Higher or Lower" onPress={() => navigation.navigate('HigherOrLower')} />
      </View>

    </View>
  );
}

function GameCard({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  cardContainer: {
    width: '100%',
    gap: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 25,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});