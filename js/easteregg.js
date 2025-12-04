class EasterEgg {
  constructor() {
    this.DcComicsHeroes = ["batmanegg", "flashegg", "greenlanternegg", "shazanegg", "supermanegg","wonderwomanegg"];
    this.clickSound = new Audio("assets/crash.mp3");
    this.clickSound.volume = 0.1;
    this.directions = [
      { dx: 3, dy: -2 }, 
      { dx: 3, dy: 2 }, 
      { dx: -3, dy: -2 },
      { dx: -3, dy: 2 }, 
    ];
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleDcComicsArray() {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    shuffleArray(this.DcComicsHeroes);
    console.log('shuffling heroes...')
  }

  DcComicsRuns() {
    console.log("DcComics runs!!!");
    this.shuffleDcComicsArray();
    const introScreen = document.getElementById("game-intro");

    this.DcComicsHeroes.forEach((DcComicsHero, index) => {
      setTimeout(() => {
        const hero = document.createElement("div");
        hero.classList.add("hero");
        hero.dataset.character = DcComicsHero;

        const DcComicsHeroImg = document.createElement("img");
        DcComicsHeroImg.src = `images/${DcComicsHero}.png`;
        DcComicsHeroImg.alt = DcComicsHero;

        hero.appendChild(DcComicsHeroImg);
        introScreen.appendChild(hero);
        
        let x = 600;
        let y = 300;

        const { dx, dy } = this.directions[index % this.directions.length];

        function animate() {
          x += dx;
          y += dy;
          hero.style.left = `${x}px`;
          hero.style.top = `${y}px`;
          requestAnimationFrame(animate);
          if (x > window.innerWidth || y > window.innerWidth) {
            hero.remove();
          }
        }
        animate();
      }, index * 1000);
    });
  }
}
