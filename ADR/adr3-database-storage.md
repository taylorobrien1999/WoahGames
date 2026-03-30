# ADR #3 – Database Storage

**Status:** Accepted  
**Date:** February 23rd, 2026


## Issue
The Woah Games app needs to determine whether and how it will persist data across app usage sessions. 
Possible use cases include saving win/loss/draw statistics for each game, remembering player names or preferences, or keeping a high score for the Higher or Lower game. 
The team must decide between local storage (encrypted or unencrypted), remote/cloud storage, or no persistent database storage at all.


## Decision
Local unencrypted storage will be used via AsyncStorage (from the @react-native-async-storage/async-storage package). 
The app will save lightweight game statistics (i.e. wins, losses, draws per game) locally on the device so that players can track their performance across sessions. No remote or cloud-based storage will be used for this scope.


## Rationale
AsyncStorage is the standard, beginner-friendly local storage solution for React Native applications. It is simple to implement, well documented, and most appropriate for storing small amounts of game data like game statistics.
Since the data being stored (win/losses, scores, etc.) is not sensitive in any way, encryption is not necessary and would add unnecessary complexity. 
Remote storage solutions such as Firebase or a REST API backend would require consistent network connectivity, user authentication, and significantly more development effort, all of which are outside of Woah Games' desired scope.


## Alternatives Considered
No storage was considered, however this would mean game statistics reset every time the app is closed, providing a less engaging experience for the user. 
Encrypted local storage (i.e. react-native-encrypted-storage) is not warranted as no sensitive user data is being stored in our app.


## Consequences
AsyncStorage is asynchronous, so all read/write operations will use async/await. Storage keys will follow a consistent naming convention (i.e. @woahgames/ttt_stats). 
Data will persist on the device until the app is uninstalled. No internet connection is required for any app functionality.
