window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const introScreen = document.getElementById("game-intro");
  const gameScreen = document.getElementById("game-screen");
  const endScreen = document.getElementById("game-end");
  const imgLogo = document.getElementById("logo-img");
  const musicButton = document.getElementById("sound");
  const musicIcon = this.document.getElementById("music-icon");
  const introMusic = new Audio("assets/intromusic.mp3");
  introMusic.volume = .1

  let game;
  let easterEgg = new EasterEgg();
  let clickCount = 0;
 

  startButton.addEventListener("click", function () {
    startGame();
    introMusic.pause();
  });

  restartButton.addEventListener("click", function () {
    resetGame();
    introMusic.pause();
  });

  musicButton.addEventListener("click", function () {
    if (!game) {
      if (introMusic.paused) {
        musicIcon.src = "/images/music-on.png";
        introMusic.play();
        game.isSoundOn = true;
      } else {
        introMusic.pause();
        musicIcon.src = "/images/music-off.png";
        game.isSoundOn = false;
      }
      return;
    }

    if (game.boardSound.paused) {
      introMusic.pause();
      musicIcon.src = "/images/music-on.png";
      game.boardSound.play();
      game.isSoundOn = true;
    } else {
      game.boardSound.pause();
      musicIcon.src = "/images/music-off.png";
      game.isSoundOn = false;
    }
  });

  imgLogo.addEventListener("click", function () {
    clickCount++;
    if (clickCount >= 3) {
      playEasterEgg();
      clickCount = 0;
    }
    easterEgg.clickSound.currentTime = 0;
    easterEgg.clickSound.play();
  });

  function startGame() {
    introScreen.style.display = "none";
    gameScreen.style.display = "block";

    game = new Game();
    document.getElementById("moves").textContent = game.moves;
    document.getElementById("score").textContent = game.score;
    document.getElementById("time").textContent = game.remainingTime;

    if (introMusic.paused) {
      game.boardSound.paused;
      game.flipSound.paused;
    } else {
      introMusic.paused;
      game.boardSound.play();
      game.flipSound.currentTime = 0;
      game.flipSound.play();
    }

    game.initBoard();
    game.showPreview();
    game.startTimer();
  }

  function resetGame() {
    game.restartGame();
  }

  function playEasterEgg() {
    easterEgg.DcComicsRuns();
  }
};
