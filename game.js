class Game {
  constructor() {
    this.flippedCards = [];
    this.score = 0;
    this.moves = 20;
    this.remainingTime = 60;
    this.timerId = 0;
    this.lockBoard = false;
    this.boardSound = new Audio("assets/gameboardsound.mp3");
    this.boardSound.volume = .1
    this.flipSound = new Audio("assets/flip.mp3");
    this.flipSound.volume = .5
    this.loseSound = new Audio("assets/youlose.wav");
    this.loseSound.volume = .1
    this.winSound = new Audio("assets/youwin.wav");
    this.winSound.volume = .1
    this.isSoundOn = false;
    this.characters = [
      "superman",
      "batman",
      "wonderwoman",
      "hawkgirl",
      "aquaman",
      "flash",
    ];

    this.gameCharacters = [...this.characters, ...this.characters];
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleArray() {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    shuffleArray(this.gameCharacters);
    console.log("shuffling cards...");
  }

  initBoard() {
    console.log("game starts!");
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    this.shuffleArray();

    this.gameCharacters.forEach((char) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.character = char;

      const front = document.createElement("div");
      front.classList.add("front");

      const backImg = document.createElement("img");
      backImg.src = "images/back.png";
      backImg.alt = "back";
      front.appendChild(backImg);

      const back = document.createElement("div");
      back.classList.add("back");

      const heroImg = document.createElement("img");
      heroImg.src = `images/${char}.png`;
      heroImg.alt = char;

      back.appendChild(heroImg);
      card.appendChild(front);
      card.appendChild(back);
      gameBoard.appendChild(card);
      this.flipCard(card);
    });
  }

  showPreview() {
    const allCards = document.querySelectorAll(".card");
    this.lockBoard = true;

    allCards.forEach((card) => card.classList.add("flipped"));

    setTimeout(() => {
      allCards.forEach((card) => card.classList.remove("flipped"));
      this.lockBoard = false;
    }, 3000);
    console.log("showing preview for 3s");
  }

  flipCard(card) {
    card.addEventListener("click", () => {
      if (this.lockBoard === true) {
        return;
      }

      if (this.flippedCards.includes(card)) {
        return;
      }

      card.classList.add("flipped");
      this.flippedCards.push(card);

      this.moves--;
      document.getElementById("moves").innerText = this.moves;

      if (this.moves < 0) {
        this.lockBoard = true;
        setTimeout(() => {
          this.endGame(false);
        }, 500);
        return;
      }
      if (this.flippedCards.length === 2) {
        this.checkForMatch();
      }
      if (this.isSoundOn) {
        this.flipSound.currentTime = 0;
        this.flipSound.play();
      }
    });
  }

  checkForMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.dataset.character === card2.dataset.character) {
      this.score++;
      this.flippedCards = [];
      console.log("Match!");
      const remainingCards = document.querySelectorAll(".card:not(.flipped)");

      if (remainingCards.length === 0) {
        this.endGame(true);
      }
    } else {
      this.lockBoard = true;
      this.score = Math.max(0, this.score - 0.5);
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        this.flippedCards = [];
        this.lockBoard = false;
      }, 1000);
      console.log("don't match!");
    }

    document.getElementById("score").innerText = this.score;
  }

  startTimer() {
    setTimeout(() => {
      this.timerId = setInterval(() => {
        this.remainingTime--;
        document.getElementById("time").innerText = this.remainingTime;

        if (this.remainingTime <= 0) {
          clearInterval(this.timerId);
          this.endGame(false);
        }
      }, 1000);
      console.log("timer starts!!!");
    }, 3000);
    console.log("timer starts in 3s");
  }

  endGame(victory) {
    this.boardSound.pause();
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("game-end");

    gameScreen.style.display = "none";
    endScreen.style.display = "block";

    const finalScoreEl = document.getElementById("final-score");
    finalScoreEl.innerText = this.score.toFixed(1);

    const endMessage = document.getElementById("end-message");
    if (victory) {
      this.winSound.play();
      endMessage.innerText = "Congratulations! You won!";
      endMessage.style.color = "#00ff00";
    } else {
      this.loseSound.play();
      endMessage.innerText = "Game Over! Try again!";
      endMessage.style.color = "#ff0000";
    }
    console.log("End Game...");
  }

  restartGame() {
    this.boardSound.currentTime = 0;
    this.boardSound.play();
    clearInterval(this.timerId);
    this.flippedCards = [];
    this.score = 0;
    this.moves = 20;
    this.remainingTime = 60;
    this.lockBoard = false;

    document.getElementById("score").innerText = this.score;
    document.getElementById("moves").innerText = this.moves;
    document.getElementById("game-board").innerHTML = "";

    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("game-end");

    endScreen.style.display = "none";
    gameScreen.style.display = "block";

    this.initBoard();
    this.showPreview();
    this.startTimer();

    this.winSound.pause();
    this.loseSound.pause();
    this.boardSound.pause();

    if (this.isSoundOn) this.boardSound.play();
    else this.boardSound.pause();

    console.log("game restarted...");
  }
}
