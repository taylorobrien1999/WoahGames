import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
// Commented out temporarily until those screens are implemented
import TicTacToeScreen from './screens/TicTacToeScreen';
//import RockPaperScissorsScreen from './screens/RockPaperScissorsScreen';
//import HigherOrLowerScreen from './screens/HigherOrLowerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Commented out temporarily until those screens are implemented*/}
        <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
        {/* <Stack.Screen name="RPS" component={RockPaperScissorsScreen} /> */}
        {/* <Stack.Screen name="HigherOrLower" component={HigherOrLowerScreen} /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}