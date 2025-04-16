const userName = localStorage.getItem("userName");
if(userName == null) {
    window.location.href = "../../index.html";
}

const gameInfo = JSON.parse(localStorage.getItem("gameInfo"));

document.getElementById("timer").textContent = gameInfo.gameTime;

if (!gameInfo || !gameInfo.createdAt) {
  console.error("Game info or creation time is missing.");
  // Redirect to the main page if game info is missing
  window.location.href = "../../index.html";
} else {
    leaveLobby();
  console.log("Game Info:", gameInfo);

  // Calculate the target start time (10 seconds after lobby creation)
  const createdAt = new Date(gameInfo.createdAt).getTime();
  const targetStartTime = createdAt + 10 * 1000; // 10 seconds after creation

  // Create a large countdown box
  const countdownBox = document.getElementById("countdownBox");
  countdownBox.style.position = "fixed";
  countdownBox.style.top = "50%";
  countdownBox.style.left = "50%";
  countdownBox.style.width = "100%";
  countdownBox.style.transform = "translate(-50%, -50%)";
  countdownBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  countdownBox.style.color = "white";
  countdownBox.style.fontSize = "48px";
  countdownBox.style.padding = "20px";
  countdownBox.style.borderRadius = "10px";
  countdownBox.style.textAlign = "center";
  countdownBox.style.zIndex = "1000";
  countdownBox.textContent = "Starting in 10.0 seconds...";

  // Update the countdown every 100ms
  const countdownInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeRemaining = targetStartTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      countdownBox.remove(); // Remove the countdown box
      startTimer(); // Start the game timer
    } else {
      const seconds = Math.floor(timeRemaining / 1000);
      const tenths = Math.floor((timeRemaining % 1000) / 100);
      countdownBox.textContent = `Starting in ${seconds}.${tenths} seconds...`;
    }
  }, 100);
}

// List of image file names in the "images" folder
const images = ["ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xk", "ye", "yt", "za", "zm", "zw"];

const nations = ["Andorra", "United Arab Emirates (UAE)", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Angola", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Aland Islands", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Saint Barthelemy", "Bermuda", "Brunei", "Bolivia", "Bonaire, Sint Eustatius, and Saba", "Brazil", "Bahamas", "Bhutan", "Botswana", "Belarus", "Belize", "Canada", "Cocos (Keeling) Islands", "Democratic Republic of the Congo", "Central African Republic", "Republic of the Congo", "Switzerland", "Ivory Coast (Cote d'Ivoire)", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Curacao", "Christmas Island", "Cyprus", "Czechia", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "Micronesia", "Faroe Islands", "France", "Gabon", "United Kingdom (UK)", "Grenada", "Georgia", "French Guiana", "Guernsey", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "Isle of Man", "India", "British Indian Ocean Territory", "Iraq", "Iran", "Iceland", "Italy", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "North Korea", "South Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Laos", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Morocco", "Monaco", "Moldova", "Montenegro", "Saint Martin", "Madagascar", "Marshall Islands", "North Macedonia", "Mali", "Myanmar", "Mongolia", "Macau", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn Islands", "Puerto Rico", "Palestine", "Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "Romania", "Serbia", "Russia", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "South Sudan", "Sao Tome and Principe", "El Salvador", "Syria", "Eswatini", "Turks and Caicos Islands", "Chad", "French Southern and Antarctic Lands", "Togo", "Thailand", "Tajikistan", "Tokelau", "Timor-Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania", "Ukraine", "Uganda", "United States (US)", "Uruguay", "Uzbekistan", "Vatican City", "Saint Vincent and the Grenadines", "Venezuela", "British Virgin Islands", "U.S. Virgin Islands", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Kosovo", "Yemen", "Mayotte", "South Africa", "Zambia", "Zimbabwe"];

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}
function sfc32(a, b, c, d) {
    return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

var seed;
var rand;

function setRandom() {
    if (sessionStorage.getItem("randomSeed") == null) {
        seed = cyrb128(String(Math.random() * 10000));
    } else {
        seed = cyrb128(String(sessionStorage.getItem("randomSeed")));
    }
    rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
    console.log(rand());
}

setRandom();

var attempts = 0;

var completed = false;

let correctGuesses = 0;
let totalGuesses = 0;
let timeLeft = gameInfo.gameTime2; // 3 minutes in seconds
let timerRunning = false;
let countdown;

let savedImages = [];


images.forEach((path, i) => {
    savedImages[i] = new Image();
    savedImages[i].src = "../../flags/" + path + ".png";
});



images.forEach((src) => {
    const img = new Image();
    img.src = "../../flags/" + src + ".png";
});

let index = 0; // Track the current image

document.getElementById("nextButton").style.visibility = "hidden";

function moveOn() {

    if (!completed) {
        return;
    }

    index = Math.floor(rand() * images.length);
    document.getElementById("flag").src = savedImages[index].src;
    document.getElementById("flag").height = "200px";
    document.getElementById("flag").width = "auto";
    document.getElementById("container").width = document.getElementById("flag").width;
    attempts = 0;
    completed = false;
    document.getElementById("nextButton").style.visibility = "hidden";
    attempts = 0;
    document.getElementById("attempts").textContent = "Attempts: " + attempts + "/6";
    hideBanner();
    recover();


}

document.getElementById("nextButton").addEventListener("click", function () {
    moveOn();
});

// Get the input field

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        if (completed) {
            document.getElementById("nextButton").click();
        } else if (document.getElementById("search").value !== "") {
            uncover();
        }
    }
});


var cover = [true, true, true, true, true, true];

function uncover() {

    var input = document.getElementById("search").value;
    document.getElementById("search").value = "";

    const matches = nations.filter(item => item.toLowerCase().includes(input));

    if (!nations.includes(input)) {
        if (matches.length == 0) {
            return;
        } else {
            input = matches[0];
        }
    }

    if (input.toLowerCase() == nations[index].toLowerCase()) {
        correctGuesses++;
        totalGuesses++;
        updateDisplay();
        completed = true;
        document.getElementById("nextButton").style.visibility = "visible";
        document.getElementById("cover1").style.opacity = 0;
        document.getElementById("cover2").style.opacity = 0;
        document.getElementById("cover3").style.opacity = 0;
        document.getElementById("cover4").style.opacity = 0;
        document.getElementById("cover5").style.opacity = 0;
        document.getElementById("cover6").style.opacity = 0;
        showBanner("✔️  " + nations[index] + "  ✔️", true);
        attempts += 1;
        document.getElementById("attempts").textContent = "Attempts: " + attempts + "/6";
        return;
    }


    var done = false;

    while (!done) {
        var random = Math.floor(Math.random() * 6);

        if (cover[random] == true) {
            var coverId = "cover" + String(random + 1);
            document.getElementById(coverId).style.opacity = 0;
            cover[random] = false;
            done = true;
        }
    }

    attempts += 1;
    document.getElementById("attempts").textContent = "Attempts: " + attempts + "/6";

    if (!cover.includes(true)) {
        completed = true;
        totalGuesses++;
        updateDisplay();
        showBanner("❌  " + nations[index] + "  ❌", false);
        document.getElementById("nextButton").style.visibility = "visible";
    }
}

function recover() {
    document.getElementById("cover1").style.opacity = 1;
    document.getElementById("cover2").style.opacity = 1;
    document.getElementById("cover3").style.opacity = 1;
    document.getElementById("cover4").style.opacity = 1;
    document.getElementById("cover5").style.opacity = 1;
    document.getElementById("cover6").style.opacity = 1;
    cover = [true, true, true, true, true, true];
}




const input = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
let selectedIndex = -1; // Track selected index

input.addEventListener("input", () => {

    if (completed) {
        input.value = ""; // Clear input if attempted
        return;
    }

    const value = input.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    selectedIndex = 0; // Reset selection on new input
    if (!value) {
        suggestionsBox.style.display = "none";
        return;
    }

    const matches = nations.filter(item => item.toLowerCase().includes(value));
    if (matches.length > 0) {
        suggestionsBox.style.display = "block";
        matches.forEach((match, index) => {
            const div = document.createElement("div");
            div.textContent = match;
            div.dataset.index = index;
            div.classList.add("autocomplete-item");

            if (index === 0) {
                div.style.backgroundColor = "#bbb";
            }

            div.addEventListener("click", () => {
                input.value = match;
                suggestionsBox.style.display = "none";
            });
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = "none";
    }
});

input.addEventListener("keydown", (e) => {
    const items = suggestionsBox.querySelectorAll("div");
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % items.length;
    } else if (e.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    } else if (e.key === "Enter" && selectedIndex !== -1) {
        input.value = items[selectedIndex].textContent;
        suggestionsBox.style.display = "none";
        selectedIndex = -1;
    }

    items.forEach((item, index) => {
        item.style.backgroundColor = index === selectedIndex ? "#bbb" : "white";
    });

    if (selectedIndex !== -1) {
        items[selectedIndex].scrollIntoView({ block: "nearest" });
    }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".autocomplete-container")) {
        suggestionsBox.style.display = "none";
        selectedIndex = 0;
    }
});


function updateDisplay() {
    document.getElementById("correctGuesses").textContent = correctGuesses;
    let accuracy = totalGuesses > 0 ? (correctGuesses / totalGuesses * 100).toFixed(1) : 0;
    document.getElementById("accuracy").textContent = accuracy + "%";
}

async function addLeader() {
  const gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
  const lobbyName = gameInfo?.lobbyName;
  const userName = localStorage.getItem("userName");

  if (!lobbyName || !userName) {
    console.error("Lobby name or user name is missing.");
    return;
  }

  try {
    // Add the player's score to the leaderboard subcollection
    await db.collection("games").doc(lobbyName).collection("leaderboard").doc(userName).set({
      user: userName,
      points: correctGuesses, // Replace with the actual points variable
      lastUpdated: firebase.firestore.Timestamp.now(),
    });
    console.log(`Player "${userName}" added to the leaderboard for game "${lobbyName}".`);
  } catch (error) {
    console.error("Error adding player to leaderboard:", error);
  }
}

function showLeaderboard() {
  const gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
  const lobbyName = gameInfo?.lobbyName;

  if (!lobbyName) {
    console.error("Lobby name is missing.");
    return;
  }

  // Get the leaderboard div
  const leaderboardDiv = document.querySelector(".leaderboard");

  // Set up a Firestore snapshot listener
  db.collection("games")
    .doc(lobbyName)
    .collection("leaderboard")
    .orderBy("points", "desc")
    .onSnapshot((snapshot) => {
      // Clear existing leaderboard entries
      leaderboardDiv.innerHTML = `
        <div class="leaderboard-header">🏆 Leaderboard</div>
      `;

      let rank = 1;
      snapshot.forEach((doc) => {
        const data = doc.data();

        // Create a new leaderboard entry
        const entry = document.createElement("div");
        entry.classList.add("leaderboard-entry");
        if (rank === 1) entry.classList.add("top-entry"); // Highlight the top entry
        entry.innerHTML = `
          <span class="rank">${rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}</span>
          <span class="name">${data.user}</span>
          <span class="points">${data.points}</span>
        `;
        leaderboardDiv.appendChild(entry);
        rank++;
      });

      // Add a "Play Again" button if it doesn't already exist
      if (!leaderboardDiv.querySelector("button")) {
        const playAgainButton = document.createElement("center");
        playAgainButton.innerHTML = `<button onclick="restartGame()">Play Again</button>`;
        leaderboardDiv.appendChild(playAgainButton);
      }

      // Show the leaderboard
      leaderboardDiv.style.display = "block";
      document.getElementById("guessContainer").style.display = "none"; // Hide the game container
    });
}

async function cleanupGame() {
  const gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
  const lobbyName = gameInfo?.lobbyName;

  if (!lobbyName) {
    console.error("Lobby name is missing.");
    return;
  }

  try {
    // Delete all documents in the leaderboard subcollection
    const leaderboardRef = db.collection("games").doc(lobbyName).collection("leaderboard");
    const snapshot = await leaderboardRef.get();
    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    // Delete the game document
    await db.collection("games").doc(lobbyName).delete();
    console.log(`Game "${lobbyName}" and its leaderboard have been deleted.`);
  } catch (error) {
    console.error("Error cleaning up game:", error);
  }
}

function startTimer() {
    if (timerRunning) return; // Prevent multiple intervals
    timerRunning = true;
    completed = true;
    moveOn();
    correctGuesses = 0;
    totalGuesses = 0;
    updateDisplay();

    document.getElementById("guessContainer").style.display = "block";
    document.getElementById("search").focus();

    countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById("timer").textContent = "Time's up!";
            document.getElementById("guessContainer").style.display = "none";

            addLeader();
            showLeaderboard();

            timerRunning = false;
        }

        timeLeft--;
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = gameInfo.gameTime; // Reset to 3 minutes
    timerRunning = false;
    document.getElementById("guessContainer").style.display = "none";

}


function showBanner(message, isCorrect) {
    var banner = document.getElementById("floatingBanner");
    banner.textContent = message;
    banner.classList.add("show");
    if (isCorrect) {
        banner.style.backgroundColor = "green";
    } else {
        banner.style.backgroundColor = "red";
    }
}

function hideBanner() {
    var banner = document.getElementById("floatingBanner");
    banner.classList.remove("show");
}


