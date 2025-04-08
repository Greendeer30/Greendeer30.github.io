    const lobby = sessionStorage.getItem("lobbyName");
    if (lobby) {
        var newWidth = 50 + 75 + String(lobby).length * 10;
        document.getElementById("topBar").style.width = String(newWidth) + "px";
        document.getElementById("lobbyName").textContent = `Lobby: ${lobby}`;
    }

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
            return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
        }
        function sfc32(a, b, c, d) {
            return function() {
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

        function setRandom(){
            if(sessionStorage.getItem("lobbyName") == null){
                seed = cyrb128(String(Math.random() * 10000));
            } else{
                seed = cyrb128(String(sessionStorage.getItem("lobbyName")));
            }
            rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
            console.log(rand());
        }
        
        setRandom();

        const wikiPop = ["YouTube", "Wikipedia", "US Open (tennis)", "Donald Trump", "Celine Dion", "Wikimedia Foundation", "Barack Obama", "Artificial intelligence", "Steve Jobs", "Soviet Union", "Serena Williams", "Rihanna", "Judy Garland", "Krishna", "Ronald Reagan", "Greek alphabet", "Roger Federer", "Israel", "Paul McCartney", "World Wide Web", "Johnny Cash", "Bill Gates", "Shiva", "Willie Nelson", "President of the United States", "United Airlines Flight 175", "Toby Keith", "Grand Slam (tennis)", "Sean Connery", "Metallica", "Michael Schumacher", "Solar System", "Marie Curie", "Cary Grant", "Venus Williams", "Hawaii", "International Phonetic Alphabet", "Billie Jean King", "Gulf War", "Gwen Stefani", "Spider-Man", "Chris Evert", "Grace Kelly", "Lion", "Alien (film)", "Coca-Cola", "Texas", "John McEnroe", "George Soros", "Cold War", "Jayne Mansfield", "Stanley Kubrick", "Kerala", "Morse code", "Dwyane Wade", "M1 Abrams", "Alaska", "Bhagavad Gita", "Tamil Nadu", "Jonestown", "The Matrix", "SpongeBob SquarePants", "Pennsylvania", "John D. Rockefeller", "Family Guy", "Seventh-day Adventist Church", "New York (state)", "Florida", "Jews", "Andre Agassi", "Star Trek", "9/11 conspiracy theories", "Henry Ford", "International Space Station", "Linux", "Arthur Ashe", "United States Marine Corps", "Spanish language", "John Adams", "Hunter S. Thompson", "Aleister Crowley", "Latin", "Hindi", "Atlanta", "Ancient Egypt", "Mammal", "The Wire", "Boeing 747", "Idi Amin", "Mary, mother of Jesus", "Pokémon", "Georgia (U.S. state)", "Margaret Court", "King Arthur", "Arabic", "E (mathematical constant)", "New Jersey", "Snake", "Massachusetts", "L. Ron Hubbard", "Dungeons & Dragons", "Komodo dragon", "Ancient Greece", "Quebec", "Yin and yang", "Leonard Bernstein", "McDonnell Douglas F-15 Eagle", "French language", "East Germany", "Karnataka", "Vishnu", "Washington (state)", "Ohio", "Rugby union", "Avatar: The Last Airbender", "Arctic Monkeys", "Saint Peter", "Green Day", '"Weird Al" Yankovic', "Mickey Mouse", "Korea", "Maryland", "Age of Enlightenment", "Steffi Graf", "Ayn Rand", "Moses", "Colorado", "Frank Zappa", "Romeo and Juliet", "Salvador Dalí", "Virginia", "Ontario", "German language", "British Columbia", "Buffy the Vampire Slayer", "Ingrid Bergman", "North Carolina", "Pete Sampras", "Martina Navratilova", "Mariana Trench", "Capital punishment", "Radiohead", "Abraham", "Lockheed C-130 Hercules", "David", "Bengali language", "Mustafa Kemal Atatürk", "The Smashing Pumpkins", "New Mexico", "Chiang Kai-shek", "Rosetta Stone", "Minnesota", "West Bengal", "Apple", "Michigan", "Maize", "Boeing 737", "Wyoming", "Alabama", "Ancient Rome", "World population", "Albert II, Prince of Monaco", "Sony", "Wimbledon Championships", "Peter O'Toole", "Utah", "F. Scott Fitzgerald", "M1911 pistol", "Holodomor", "Newfoundland and Labrador", "Sidney Poitier", "The Cure", "R.E.M.", "Airbus", "The Legend of Zelda", "Golden ratio", "Arizona", "Missouri", "Octopus", "Dodo", "Nova Scotia", "Baku", "Illinois", "Fox", "Rumi", "Faye Dunaway", "Bear", "Monica Seles", "Taylor series", "Latin America", "Rhode Island", "Fish", "Tasmania", "Agnosticism", "Ford Mustang", "Metro-Goldwyn-Mayer", "Tennessee", "Second Boer War", "Montana", "Pythagorean theorem", "Tennis", "Daft Punk", "Pop music", "Belgrade", "Albert Camus", "Björn Borg", "Impressionism", "Camera", "Bayes' theorem", "James Madison", "Oregon", "Atheism", "Inca Empire", "Maine", "Liverpool", "James A. Garfield", "Hamlet", "Lawrence Taylor", "Garry Kasparov", "Grateful Dead", "Louisiana", "Yasser Arafat", "Kentucky", "Connecticut", "Cartoon Network", "Tool (band)", "Oklahoma", "Wisconsin", "Bronze Age", "Kurt Vonnegut", "Hebrew language", "Esperanto", "Calculator", "Iron Man", "Metaphysics", "Myocardial infarction", "Furry fandom", "Sum 41", "Syphilis", "Siberia", "Cyrillic script", "Ted Turner", "Latin alphabet", "Texas A&M University", "Rolling Stone", "West Virginia", "Richard Wagner", "Jellyfish", "Guinea pig", "Electronic Arts", "Ronnie O'Sullivan", "Sushi", "Boris Yeltsin", "My Chemical Romance", "Egyptian hieroglyphs", "Amazon rainforest", "Shark", "Petroleum", "New Hampshire", "Belfast", "Tree", "Delaware", "French Open", "Scorpion", "Mississippi", "Crocodile", "Palace of Versailles", "Reformation", "Cleveland", "Plasma (physics)", "Nevada", "Vermont", "Indiana", "Computer science", "Australian Open", "Insect", "Aztecs", "Ian Fleming", "Forgotten Realms", "Little Boy", "Alberta", "South Carolina", "Arkansas", "Abkhazia", "Dhaka", "Woman", "Falun Gong", "Sugar Ray Robinson", "Jazz", "Ethics", "Reptile", "Marvel Comics", "Virginia Tech shooting", "Louvre", "Newcastle upon Tyne", "Rock music", "Bill Russell", "Cartoon", "Book", "Perth", "Lavrentiy Beria", "George Weah", "Cossacks", "Turtle", "New South Wales", "5.56×45mm NATO", "Captain America", "Cuneiform", "Tofu", "Lego", "T. E. Lawrence", "Diego Rivera", "Whisky", "Baghdad", "Sugar", "Vodka", "KGB", "Georg Wilhelm Friedrich Hegel", "Aaron Sorkin", "Tornado", "Nebraska", "Shingles", "Cigarette", "M1 Garand", "Hakeem Olajuwon", "Helicopter", "Human papillomavirus infection", "Beirut", "Reykjavík", "Piano", "Robert Mugabe", "Atmosphere of Earth", ".50 BMG", "Sodium chloride", "Kathmandu", "Heckler & Koch MP5", "Pyotr Ilyich Tchaikovsky", "Tbilisi", "Soybean", "9×19mm Parabellum", "Yerevan", "Science fiction", "Idaho", "War and Peace", "Food", "Saskatchewan", "Eigenvalues and eigenvectors", "Iowa", "Brighton", "Vegetable", "Barley", "South Dakota", "New Brunswick", "Abacus", "Submarine", "CERN", "Circulatory system", "Bald eagle", "Star Trek: Deep Space Nine", "Suez Crisis", "Animation", "Pasta", "Slayer", "Peloponnesian War", "Totalitarianism", "Shamanism", "Punk rock", "Cretaceous–Paleogene extinction event", "Blue", "Boxing", "Great Purge", "Thompson submachine gun", "Year", "Damascus", "Life expectancy", "Queensland", "Parrot", "Aspirin", "Sofia", "Nunavut", "Pollution", "Great Fire of London", "Antonio Vivaldi", "Flannery O'Connor", "Ulaanbaatar", "Robot", "Fat Man", "Indonesian language", "Chaos theory", "Martina Hingis", "Outer space", "Turkish language", "Édith Piaf", "Aesthetics", "Dharma", "Pyongyang", "Backgammon", "Lockheed P-38 Lightning", "Animism", "Humvee", "Confucianism", "Arabic alphabet", "West Side Story", "Squid", "Doha", "Islamabad", "School", "Pretoria", "Astana", "Archaea", "No Doubt", "Indigenous peoples", "Classical antiquity", "Trolley problem", "Alpaca", "Chris Benoit double-murder and suicide", "Prince Edward Island", "North Dakota", "Salt", ".22 Long Rifle", "General relativity", "Whale", "Alligator", "Disease", "Surrealism", "Creative Commons", "Common sunflower", "Gulag", "Yeast", "Chinese characters", "Terrorism", "Ingmar Bergman", "Grunge", "Derivative", "The Daily Show", "Milton Friedman", "Wine", "Complex number", "Riga", "American English", "Reincarnation", "Jimmy Wales", "La Paz", "Yukon", "Gene Tierney", "Anton Chekhov", "Radha Krishna", "Ankara", "Romanian language", "Dallas (1978 TV series)", "Hank Aaron", "Vladimir Nabokov", "Folk music", "Mountain", "Hebrew alphabet", "Extinction", "Plastic", "Akrotiri and Dhekelia", "Devanagari", "French invasion of Russia", "Red", "Sputnik 1", "Amphibian", "Real number", "Desert", ".30-06 Springfield", "RSA (cryptosystem)", "Integral", "V-2 rocket", "Kinshasa", "Muscat", "Maria Callas", "Golf", "Cereal", "Moonshine", "Sergei Rachmaninoff", "Star of David", "William F. Buckley Jr.", "Ljubljana", "Mitochondrion", "Natural science", "Cartesian coordinate system", "Manitoba", "Hattie McDaniel", "Victoria (state)", "Silk", "Swan Lake", "Aeschylus", "Tallinn", "Split, Croatia", "Marcus Garvey", "Aikido", "Virtual reality", "Amharic", "Oyster", "Benzene", "Desmond Tutu", "Kabul", "Phnom Penh"];
        
        let clickCount = 0;
        let startArticle = "";
        let targetArticle = "";
        
        function getRandomWikipediaArticle() {
            return fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
                .then(response => response.json())
                .then(data => data.title);
        }

        function getRandomTopWikipediaArticle() {
            var randomNum = Math.floor(rand() * (wikiPop.length - 1));
            var link = wikiPop[randomNum];
            while(link.includes(" ")){
                link = link.replace(" ", "_");
            }
            link = "https://en.wikipedia.org/api/rest_v1/page/summary/" + link;
            return fetch(link)
                .then(response => response.json())
                .then(data => data.title);
        }
        
        async function startGame() {
            document.getElementById("start-button").style.display = "none";
            startArticle = await getRandomTopWikipediaArticle();
            targetArticle = await getRandomTopWikipediaArticle();
            clickCount = 0;
            startTimer();
            document.getElementById("start-article").textContent = startArticle;
            document.getElementById("target-article").textContent = targetArticle;
            document.getElementById("wiki-frame").src = `https://en.m.wikipedia.org/wiki/${startArticle.replace(/ /g, "_")}`;
            document.getElementById("info").style.visibility = "visible";
            document.getElementById("info-in-box").textContent = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${targetArticle.replace(/ /g, "_")}`).then(response => response.json()).then(data => data.description);
        }
        
        function resetGame() {
            clickCount = 0;
            document.getElementById("wiki-frame").src = "";
            document.getElementById("start-button").style.display = "block";
        }


        let timer;
        let secondsElapsed = 0;

        function startTimer() {
            clearInterval(timer); // Reset the timer if a new game starts
            secondsElapsed = 0;
            document.getElementById("timer").textContent = "0s";
            timer = setInterval(() => {
                secondsElapsed++;
                var link = targetArticle;
            link = "en.m.wikipedia.org/wiki/" + link.replace(" ", "_");
                document.getElementById("timer").textContent = `${secondsElapsed}s`;
            
                var link = targetArticle;
            while(link.includes(" ")){
                link = link.replace(" ", "_");
            }
            link = "en.m.wikipedia.org/wiki/" + link;
            if (document.getElementById("wiki-frame").src.includes(link)) {
                stopTimer();
            }
            
            
            }, 1000);
        }
        
        function stopTimer() {
            clearInterval(timer); // Stops the timer
        }

        function toggleInfo() {
            var infoBox = document.getElementById("infoBox");
            if (infoBox.style.display === "none" || infoBox.style.display === "") {
                infoBox.style.display = "block";
            } else {
                infoBox.style.display = "none";
            }
        }