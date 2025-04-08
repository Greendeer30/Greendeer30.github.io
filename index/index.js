    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("popupModal");

    openModalBtn.onclick = () => {
      modal.style.display = "flex";
      document.getElementById("lobbyInput").focus();
    };

    document.getElementById("lobbyInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Optional: prevents accidental form submissions
            saveLobby();
        }
    });


    function closeModal() {
      modal.style.display = "none";
    }

    function saveLobby() {
      const value = document.getElementById("lobbyInput").value;
      if (value.trim()) {
        sessionStorage.setItem("lobbyName", value);
        alert(`You've joined lobby "${value}"`);
        closeModal();

        sessionStorage.setItem("userName", prompt("Enter your name:") || "Anonymous");
        removeInactiveUsers(value);

        db.collection("lobbies").add({
            lobbyName: value,
            user: sessionStorage.getItem("userName"),
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

    // Optional: close modal when clicking outside of content
    window.onclick = function(event) {
      if (event.target === modal) {
        closeModal();
      }
    };

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
        const leaderboardList = document.getElementById("leaderboardList");
        userList.innerHTML = `<h3>Flagle Leaderboard</h3>`;
        leaderboardList.style.display = "block";

        db.collection("leaderboard").onSnapshot((querySnapshot) => {
          var leaderboard = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            leaderboard.push(data.user);
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
          if(leaderboard.length > 0){
            leaderboardList.innerHTML = `<h3>Flagle Leaderboard</h3><ul>`;
          }
          for(var i = 0;i < leaderboard.length && i < 5;i++){
            leaderboardList.innerHTML += `<p>#${i + 1}) ${leaderboard[i].user}: ${leaderboard[i].points}</p>`
            }
            if(leaderboard.length > 0){
                leaderboardList.innerHTML += `</ul>`
            }
        });
        
      } 
      displayLeaderboard();

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
        const userName = sessionStorage.getItem("userName"); // Store the user's name in sessionStorage
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