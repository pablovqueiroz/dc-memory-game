# DC MEMORY GAME

## [Play the Game!](https://pablovqueiroz.github.io/dc-memory-game/)

![Game Logo](images/gamelogo.png)

# Description

DC Memory Game is a browser-based memory matching game where players test their memory by flipping cards to find matching pairs of DC heroes. The game challenges players to match all pairs before running out of moves or time. At the end of the game, a score is calculated based on the number of successful matches and remaining moves or time. Players can restart the game to try and improve their score.  

The game also features a hidden **Easter Egg** where DC heroes animate across the screen when the logo is clicked three times.

# Main Functionalities

- The player clicks **Start Game**.
- The `#game-intro` screen disappears, and `#game-screen` appears.
- The `Game` class creates the game board (cards) and starts the timer.
- The player clicks on the cards.
- Stats (Score, Moves, Time) are updated in real time.
- When all cards are matched or time runs out, `endGame()` is called:
  - `#game-screen` hides.
  - `#game-end` appears with the final score.
- Clicking the game logo three times triggers the Easter Egg animation with sound.

# Minimum Viable Product (MVP)

The minimum features required for this DC Memory Game are:

- Start screen with game title and "Start Game" button.
- Game board displaying 12 cards (6 pairs of DC heroes) in a grid layout.
- Cards can be flipped to reveal the hero image.
- Matching pairs remain visible; non-matching pairs flip back automatically.
- Move counter that tracks the number of flips made.
- Timer counting down the remaining time.
- Score counter that increases when pairs are matched and decreases slightly when mismatched.
- Game over screen showing the final score and a message indicating whether the player won or lost.
- Restart button to replay the game.
- Easter Egg animation for extra fun.

# Backlog

These are features I can implement after completing the MVP:

- Make the game fully responsive for mobile and tablet devices.
- Include additional sound effects for card flips, matches, and game win/loss events.
- Add theme variations (different backgrounds or hero sets).
- Add more card pairs and heroes for increased difficulty.
- Implement a high-score leaderboard to track top scores.

# Technologies Used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Audio API
- CSS animations

# Data structure

## game.js

### Class `Game`

The `Game` class manages a memory card game with character cards.

### Properties

- `flippedCards` — Array storing the currently flipped cards.
- `score` — Current player score.
- `moves` — Number of remaining moves.
- `remainingTime` — Remaining time on the timer.
- `timerId` — ID of the timer used with `setInterval`.
- `lockBoard` — Boolean that temporarily locks the board.
- `boardSound` — Background board audio.
- `boardSound.volume` — Volume of the board sound.
- `flipSound` — Flip card sound.
- `flipSound.volume` — Volume of flip sound.
- `loseSound` — Sound for losing.
- `loseSound.volume` — Volume of lose sound.
- `winSound` — Sound for winning.
- `winSound.volume` — Volume of win sound.
- `isSoundOn` — Boolean toggle for sounds.
- `characters` — Array of hero names.
- `gameCharacters` — Duplicated and shuffled array of characters for gameplay.

## Methods

### `shuffleArray()`

Shuffles the `gameCharacters` array using the Durstenfeld shuffle algorithm.

### `initBoard()`

Initializes the game board, creating HTML elements for the cards and adding click events.

### `showPreview()`

Flips all cards for 3 seconds at the start of the game to show a preview.

### `flipCard(card)`

Handles card click logic, managing moves and checking when two cards are flipped.

### `checkForMatch()`

Checks if two flipped cards match, updates the score, unlocks cards, or ends the game.

### `startTimer()`

Starts the game timer, decrementing `remainingTime` every second.

### `endGame(victory = false)`

Ends the game, showing a victory or defeat screen and the final score.

### `restartGame()`

Restarts the game, resetting all variables, reinitializing the board, and restarting the timer.

## Function

### `marvelHeroes()`

- Triggers the Easter Egg animation of DC heroes.

# script.js

## Game Initialization and DOM Handling

This script handles the game's start, restart, sound toggle, logo clicks, and UI interactions.

## Elements

- `startButton` — The "Start Game" button element.
- `restartButton` — The "Restart Game" button element.
- `introScreen` — The initial introduction screen element.
- `gameScreen` — The main game screen element.
- `endScreen` — The game over / victory screen element.
- `imgLogo` — Game logo element, used for Easter Egg.
- `musicButton` — Button to toggle sound/music.
- `musicIcon` — Image inside music button.
- `introMusic` — Intro music audio object.
- `introMusic.volume` — Volume of intro music.
- `game` — Instance of the `Game` class.
- `easterEgg` — Instance of `EasterEgg`.
- `clickCount` — Counts clicks on logo for Easter Egg.

## Event Listeners

- `startButton` — Starts the game when clicked by calling `startGame()`.
- `restartButton` — Restarts the game when clicked by calling `resetGame()`.
- `musicButton` — Toggles background and board music.
- `imgLogo` — Click to increment Easter Egg counter.

## Functions

### `startGame()`

- Hides the intro screen and shows the game screen.
- Creates a new instance of `Game`.
- Updates the UI with initial `moves`, `score`, and `remainingTime`.
- Shuffles the cards, initializes the game board, shows a preview of all cards, and starts the timer.
- Handles sound playback depending on user toggle.

### `resetGame()`

- Hides the end screen and shows the game screen.
- Calls the `restartGame()` method on the current `Game` instance to reset the game state.

### `playEasterEgg()`

- Calls `DcComicsRuns()` from the `EasterEgg` class.

# States and State Transitions

The game has the following states (views):

1. **Intro / Start Screen**
   - Shows the game logo, a start button, and a subtitle.
   - Player clicks "Start Game" to transition to the Game Screen.

2. **Game Screen**
   - Displays the game board, score, moves, and timer.
   - Player flips cards to match pairs.
   - The game can end in two ways:
     - Victory: all pairs are matched.
     - Defeat: moves run out or time expires.
   - After the game ends, the state transitions to the End Screen.

3. **End Screen**
   - Shows a final score and a message (e.g., "Congratulations!" or "Game Over").
   - Player can click "Restart Game" to go back to the Game Screen and start a new game.

# Task

List of tasks in order of priority:

1. **Set up project structure**
   - Create folders: `images`, `css`, `js`
   - Create files: `index.html`, `style.css`, `game.js`, `script.js`, `easteregg.js`

2. **Design the HTML layout**
   - Intro screen with logo, start button, and subtitle.
   - Game screen with stats (score, moves, timer) and game board.
   - End screen with final score, message, and restart button.

3. **Style the game using CSS**
   - Layout and positioning.
   - Card dimensions, grid, and 3D flip animation.
   - Intro and End screen styling.
   - Responsive design adjustments.

4. **Implement game logic in JavaScript**
   - Create `Game` class.
   - Define properties (score, moves, timer, flipped cards, sounds).
   - Initialize game board and shuffle cards.
   - Handle card flipping and matching logic.
   - Count moves and update stats.
   - Detect victory or defeat.
   - Implement Easter Egg animation.

5. **Connect JS to HTML**
   - Add event listeners for Start, Restart buttons, music toggle, and Easter Egg.
   - Update DOM elements (score, moves, time) dynamically.

6. **Test the game**
   - Verify card flipping works correctly.
   - Ensure moves and timer update properly.
   - Check end game messages for win/lose.
   - Confirm restart works as expected.
   - Test Easter Egg animation.

7. **Optional enhancements (after MVP)**
   - Add sound effects.
   - Add animations on matching cards.
   - Make the game responsive for mobile devices.

# Links

- [Slides Link]()
- [GitHub Repository Link](https://github.com/pablovqueiroz/dc-memory-game)
- [Deployment Link](https://pablovqueiroz.github.io/dc-memory-game/)
