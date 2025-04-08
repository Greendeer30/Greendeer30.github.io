const countries = [
    { name: "China", population: 1393409038 },
    { name: "India", population: 1366417754 },
    { name: "United States", population: 331002651 },
    { name: "Indonesia", population: 273523615 },
    { name: "Pakistan", population: 220892340 },
    { name: "Brazil", population: 212559417 },
    { name: "Nigeria", population: 206139589 },
    { name: "Bangladesh", population: 164689383 },
    { name: "Russia", population: 145934462 },
    { name: "Mexico", population: 128933395 }
  ];
  
  let score = 0;
  let currentCountryIndex = 0;
  let nextCountryIndex = 1;
  
  function startGame() {
    setCountryData();
    document.getElementById("game-over").style.display = "none";
    document.getElementById("score-counter").innerText = score;
  }
  
  function setCountryData() {
    const country1 = countries[currentCountryIndex];
    const country2 = countries[nextCountryIndex];
  
    document.getElementById("country-1-name").innerText = country1.name;
    document.getElementById("country-1-population").innerText = `Population: ${country1.population}`;
  
    document.getElementById("country-2-name").innerText = country2.name;
    document.getElementById("country-2-population").innerText = `Population: ???`;
    
    document.querySelector(".left").onclick = () => checkGuess(country1, country2);
    document.querySelector(".right").onclick = () => checkGuess(country2, country1);
  }
  
  function checkGuess(chosenCountry, nextCountry) {
    if (chosenCountry.population > nextCountry.population) {
      score++;
      currentCountryIndex = nextCountryIndex;
      nextCountryIndex = (nextCountryIndex + 1) % countries.length;
      setCountryData();
    } else {
      gameOver();
    }
  }
  
  function gameOver() {
    document.getElementById("final-score").innerText = score;
    document.getElementById("game-over").style.display = "block";
  }
  
  function restartGame() {
    score = 0;
    currentCountryIndex = 0;
    nextCountryIndex = 1;
    startGame();
  }
  
  startGame();
  