// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOqTTkZoEFvmk8RD1-7gJyI3V8Ao-VlJs",
    authDomain: "finaltest-80138.firebaseapp.com",
    projectId: "finaltest-80138",
    storageBucket: "finaltest-80138.firebasestorage.app",
    messagingSenderId: "252001476022",
    appId: "1:252001476022:web:d0f596f298252f558df517",
    measurementId: "G-V7MBGT2T23"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();

//auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);


async function insertUsername(userId) {
  try {
    // Query the "users" collection for documents where "uid" matches the userId
    const querySnapshot = await db.collection("users").where("uid", "==", userId).get();

    // Check if any documents were found
    if (!querySnapshot.empty) {
      // Get the first document's data (assuming "uid" is unique)
      const doc = querySnapshot.docs[0];
      const username = doc.data().username;
      const email = doc.data().email;
      const dateDay = doc.data().date.toDate().getDate()
      const dateMonth = doc.data().date.toDate().getMonth();
      const dateYear = doc.data().date.toDate().getFullYear();

      // Save the username to localStorage
      localStorage.setItem("userName", username);
      localStorage.setItem("email", email);
      localStorage.setItem("dateCreated", dateDay);
      localStorage.setItem("monthCreated", dateMonth);
      localStorage.setItem("yearCreated", dateYear);
      console.log("Username saved to localStorage:", username);
    } else {
      console.error("No user found with the given UID:", userId);
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }
}



function leaveLobby() {
  const lobbyName = sessionStorage.getItem("lobbyName");
  const userName = localStorage.getItem("userName");

  if (!lobbyName || !userName) {
    console.error("Lobby name or user name is missing.");
    return;
  }

  const userRef = db.collection("lobbies").doc(lobbyName).collection("users").doc(userName);

  // Remove the user from the lobby's users subcollection
  userRef.delete()
    .then(() => {
      console.log(`User "${userName}" has left the lobby "${lobbyName}".`);
      sessionStorage.removeItem("lobbyName"); // Clear the lobby name from sessionStorage
      inLobby = false; // Update the inLobby state

      // Reset the UI to the default state
      document.getElementById("lobby-interface").style.display = "block";
      document.getElementById("lobby-interface2").style.display = "none";
      document.getElementById("lobby-title").innerHTML = "";
      document.getElementById("lobby-users").innerHTML = "";

      // Optionally refresh the lobby list
      displayLobbies();

      // Check and remove empty lobbies
      removeEmptyLobbies();
    })
    .catch((error) => {
      console.error("Error leaving the lobby:", error);
    });
}
