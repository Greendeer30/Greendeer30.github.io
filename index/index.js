const images = ["ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xk", "ye", "yt", "za", "zm", "zw"];
const randomImage = images[Math.floor(Math.random() * images.length)];
const backgroundContainer = document.getElementById("background-container");
  

// Set the CSS variable for the background image
backgroundContainer.style.setProperty(
  "--background-image",
  `url('../flags/${randomImage}.png')`
);

function SignOut(){
    auth.signOut().then(() => {
        console.log("User signed out successfully.");
        loggedIn = false;
        dashboard.classList.remove('active');
        loginSection.classList.remove('hidden');
    });
}

const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sideMenu = document.getElementById('side-menu');
    const loginButton = document.getElementById('login-button');
    const loginSection = document.getElementById('login-section');
    const dashboard = document.getElementById('dashboard');
    const userInfo = document.getElementById('user-info');
    const userInfoHeader = document.getElementById('user-info-header');
    const joinLobbyButton = document.getElementById('join-lobby');
    const lobbySection = document.getElementById('lobby-section');
    const userBox = document.getElementById('user-box');
    const lobbyBox = document.getElementById('lobby-box');

    let loggedIn = false;
    let inLobby = false;

    function logIn(){
      userInfoHeader.innerHTML =  "🎉Welcome, " + localStorage.getItem("userName") + "!🎉";
      userInfo.innerHTML = `<em>Username: </em><strong>${localStorage.getItem("userName")}</strong><br>` + `<em>Email: </em><strong>${localStorage.getItem("email")}</strong>`;
      loginSection.classList.add('hidden');
      dashboard.classList.add('active');
      const dateC = localStorage.getItem("dateCreated");
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      console.log(dateC[3]);
      userInfo.innerHTML += `<br><em>Account Created: </em><strong>${months[localStorage.getItem("monthCreated")]} ${localStorage.getItem("dateCreated")}, ${localStorage.getItem("yearCreated")}</strong>`;
    }

    auth.onAuthStateChanged((user) => {
        console.log("moving!");
        console.log(user);
        if (user) {
          console.log(user.uid);
          console.log("User is logged in:", user.username);
          insertUsername(user.uid);
          loggedIn = true;
          logIn();
        } else {
          console.log("No user is logged in.");
          loggedIn = false;
        }
      });

    menuToggle.addEventListener('click', () => {
      sideMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
      sideMenu.classList.remove('active');
    });

    joinLobbyButton.addEventListener('click', () => {
      inLobby = true;
      lobbySection.innerHTML = `
        <p>Lobby Name: Not Working Yet</p>
        <ul>
          <li>johndoe</li>
          <li>alice</li>
          <li>bob</li>
        </ul>
      `;
    });



    function normalizeToNameFormat(str) {
      return str
          .split(' ') // Split the string into an array of words
          .map(word => 
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first letter and lowercase the rest
          )
          .join(' '); // Join the words back into a single string
    }

    function saveLobby() {
      const value = document.getElementById("lobbyInput").value;
      if (value.trim()) {
        sessionStorage.setItem("lobbyName", value);
        alert(`You've joined lobby "${value}"`);
        closeModal();
        
        removeInactiveUsers(value);

        db.collection("lobbies").add({
            lobbyName: value,
            user: localStorage.getItem("userName"),
            lastActive: firebase.firestore.Timestamp.now() // Use Firestore Timestamp
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        displayUsers(value);

      } else {
        alert("Please enter a lobby name.");
      }
    }

    function displayUsers(lobbyName) {
      const userList = document.getElementById("userList");
      userList.innerHTML = `<h3>Users in ${lobbyName}</h3>`;
      userList.style.display = "block";

      db.collection("lobbies").where("lobbyName", "==", lobbyName).onSnapshot((querySnapshot) => {
        userList.innerHTML = `<h3>Users in ${lobbyName}</h3><ul>`;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userList.innerHTML += `<li>${data.user}</li>`;
        });
        userList.innerHTML += `</ul>`;
      });
    } 

    function displayLeaderboard() {
        db.collection("leaderboard").onSnapshot((querySnapshot) => {
          var leaderboard = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            leaderboard.push(data);
          });
          var sortedLeaderboard = [];
          while(leaderboard.length > 0){
            var leadMax = 0;
            for(var i = 1;i < leaderboard.length;i++){
                if(leaderboard[i].points > leaderboard[leadMax].points){
                    leadMax = i;
                }
            }
            sortedLeaderboard.push(leaderboard[leadMax]);
            leaderboard.splice(leadMax, 1);
          }
          leaderboard = sortedLeaderboard;
          
          document.getElementById("p1").innerHTML = leaderboard[0].points;
          document.getElementById("p2").innerHTML = leaderboard[1].points;
          document.getElementById("p3").innerHTML = leaderboard[2].points;
          document.getElementById("p4").innerHTML = leaderboard[3].points;

          document.getElementById("u1").innerHTML = leaderboard[0].user;
          document.getElementById("u2").innerHTML = leaderboard[1].user;
          document.getElementById("u3").innerHTML = leaderboard[2].user;
          document.getElementById("u4").innerHTML = leaderboard[3].user;
        });
        
      } 
      displayLeaderboard();

      function displayName() {
        nameList.innerHTML = `<h3>Logged in as:</h3>`;
        nameList.style.display = "block";
        nameList.innerHTML += `<p>${localStorage.getItem("userName")}</p>`;
      } 
      displayName();

    function updateLastActive(lobbyName, userName) {
        const userRef = db.collection("lobbies").where("lobbyName", "==", lobbyName).where("user", "==", userName);

        userRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    lastActive: firebase.firestore.Timestamp.now()
                });
            });
        }).catch((error) => {
            console.error("Error updating last active timestamp: ", error);
        });
    }

    // Call this function every minute
    setInterval(() => {
        const lobbyName = sessionStorage.getItem("lobbyName");
        const userName = localStorage.getItem("userName"); // Store the user's name in localStorage
        if (lobbyName !== null && userName !== null) {
            updateLastActive(lobbyName, userName);
        }
    }, 60000);

    function removeInactiveUsers(lobbyName) {
        const threshold = firebase.firestore.Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 1000)); // 5 minutes ago
        console.log("Threshold for inactivity:", threshold.toDate());

        db.collection("lobbies")
            .where("lastActive", "<", threshold)
            .get()
            .then((querySnapshot) => {
                console.log(`Found ${querySnapshot.size} inactive users.`);
                querySnapshot.forEach((doc) => {
                    console.log("Removing user:", doc.data());
                    doc.ref.delete().then(() => {
                        console.log(`Removed inactive user: ${doc.data().user}`);
                    }).catch((error) => {
                        console.error("Error removing inactive user: ", error);
                    });
                });
            })
            .catch((error) => {
                console.error("Error querying inactive users: ", error);
            });
    }

    // Call this function periodically
    setInterval(() => {
        const lobbyName = sessionStorage.getItem("lobbyName");
        if (lobbyName) {
            removeInactiveUsers(lobbyName);
        }
    }, 120000); // Check every 6 seconds