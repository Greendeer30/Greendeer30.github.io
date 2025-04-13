// List of image file names in the "images" folder
const images = ["ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xk", "ye", "yt", "za", "zm", "zw"];

const nations = ["Andorra", "United Arab Emirates (UAE)", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Angola", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Aland Islands", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Saint Barthelemy", "Bermuda", "Brunei", "Bolivia", "Bonaire, Sint Eustatius, and Saba", "Brazil", "Bahamas", "Bhutan", "Botswana", "Belarus", "Belize", "Canada", "Cocos (Keeling) Islands", "Democratic Republic of the Congo", "Central African Republic", "Republic of the Congo", "Switzerland", "Ivory Coast (Cote d'Ivoire)", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Curacao", "Christmas Island", "Cyprus", "Czechia", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "Micronesia", "Faroe Islands", "France", "Gabon", "United Kingdom (UK)", "Grenada", "Georgia", "French Guiana", "Guernsey", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "Isle of Man", "India", "British Indian Ocean Territory", "Iraq", "Iran", "Iceland", "Italy", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "North Korea", "South Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Laos", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Morocco", "Monaco", "Moldova", "Montenegro", "Saint Martin", "Madagascar", "Marshall Islands", "North Macedonia", "Mali", "Myanmar", "Mongolia", "Macau", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn Islands", "Puerto Rico", "Palestine", "Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "Romania", "Serbia", "Russia", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "South Sudan", "Sao Tome and Principe", "El Salvador", "Syria", "Eswatini", "Turks and Caicos Islands", "Chad", "French Southern and Antarctic Lands", "Togo", "Thailand", "Tajikistan", "Tokelau", "Timor-Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania", "Ukraine", "Uganda", "United States (US)", "Uruguay", "Uzbekistan", "Vatican City", "Saint Vincent and the Grenadines", "Venezuela", "British Virgin Islands", "U.S. Virgin Islands", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Kosovo", "Yemen", "Mayotte", "South Africa", "Zambia", "Zimbabwe"];
var attempts = 0;

var completed = false;

let correctGuesses = 0;
let totalGuesses = 0;
let timeLeft = 180; // 3 minutes in seconds
let timerRunning = false;
let countdown;

let savedImages = [];

const lobby = sessionStorage.getItem("lobbyName");
    if (lobby) {
        var newWidth = 50 + 75 + String(lobby).length * 10;
        document.getElementById("topBar").style.width = String(newWidth) + "px";
        document.getElementById("lobbyName").textContent = `Lobby: ${lobby}`;
    }

// Preload images
images.forEach((path, i) => {
    savedImages[i] = new Image();
    savedImages[i].src = "../flags/" + path + ".png";
});

    

images.forEach((src) => {
    const img = new Image();
    img.src = "../flags/" + src + ".png";
});

let index = 0; // Track the current image

document.getElementById("nextButton").style.visibility = "hidden";

function moveOn(){

    if(!completed){
        return;
    }

    index = Math.floor(Math.random() * images.length);
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

document.getElementById("nextButton").addEventListener("click", function() {
    moveOn();
});

// Get the input field

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if(completed){
            document.getElementById("nextButton").click();
        } else if(document.getElementById("search").value !== ""){
            uncover();
        }
    }
});


var cover = [true, true, true, true, true, true];

function uncover() {

    var input = document.getElementById("search").value;
    document.getElementById("search").value = "";

    const matches = nations.filter(item => item.toLowerCase().includes(input));

    if(!nations.includes(input)){
        if(matches.length == 0){
            return;
        } else{
            input = matches[0];
        }
    }
    
    if(input.toLowerCase() == nations[index].toLowerCase()){
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
    
    while(!done){
        var random = Math.floor(Math.random() * 6);

        if(cover[random] == true){
            var coverId = "cover" + String(random + 1);
            document.getElementById(coverId).style.opacity = 0;
            cover[random] = false;
            done = true;
        }
    }

    attempts += 1;
    document.getElementById("attempts").textContent = "Attempts: " + attempts + "/6";

    if(!cover.includes(true)){
        completed = true;
        totalGuesses++;
        updateDisplay();
        showBanner("❌  " + nations[index] + "  ❌", false);
        document.getElementById("nextButton").style.visibility = "visible";
    }
}

function recover(){
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
            
            if (index === 0){
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
        items[selectedIndex].scrollIntoView({ block: "nearest"});
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

            db.collection("leaderboard").add({
                user: localStorage.getItem("userName"),
                points: correctGuesses,
                uid: auth.currentUser.uid
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

            timerRunning = false;
        }

        timeLeft--;
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 180; // Reset to 3 minutes
    document.getElementById("timer").textContent = "3:00";
    timerRunning = false;
    document.getElementById("guessContainer").style.display = "none";
    
}








function showBanner(message, isCorrect) {
    var banner = document.getElementById("floatingBanner");
    banner.textContent = message;
    banner.classList.add("show");
    if(isCorrect){
        banner.style.backgroundColor = "green";
    } else{
        banner.style.backgroundColor = "red";
    }
}

function hideBanner() {
    var banner = document.getElementById("floatingBanner");
    banner.classList.remove("show");
}
