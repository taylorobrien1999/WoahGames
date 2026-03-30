# ADR #1 – Navigation Strategy

**Status:** Accepted  
**Date:** February 20th, 2026

## Issue:
Woah Games contains multiple unique screens such as a Home/Menu screen where you will select a game, followed by individual game screens for Tic Tac Toe, Rock Paper Scissors, and Higher or Lower.
A clear and consistent navigation strategy is significantly required so that users can move between these screens intuitively without getting lost or losing their game state unexpectedly.


## Decision:
React Navigation will be used as the navigation library. Implementing a stack navigator as the primary navigation pattern will resolve our issue. 
The app will use a home screen as the central hub where users will be prompted to choose a game to play.
Each game screen will be pushed onto the stack when selected and popped off when the user exits back to the home screen.


## Rationale: 
React Navigation is the most commonly used and well-documented navigation solution for React Native, which makes it an appropriate choice given the team’s current skill level, project scope, and course timeline.
A stack navigator is the simplest and most appropriate pattern for this app because the navigation follows a linear flow (i.e. Home > Game > Back to Home).
It preserves the users current screen state while navigating and avoids the complexity of Tab or Drawer navigation, which would be unnecessary given the apps previously outlined scope.


## Alternatives Considered:
An alternative we considered was the bottom tab navigator which would allow switching between games at any given time but could cause users to accidentally leave an active game and ultimately seemed redundant for our scope.


## Consequences:
The stack-based approach means that each game screen is self-contained and isolated by itself. Back button behaviour will be handled natively by React Navigation. 
All screens must be registered with the navigator in App.js or a central navigation file.
