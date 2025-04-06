alert(1);
// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
console.log(2);
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
console.log(3);
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDEeITLhX8is-zm2sHMDa2lbdeX_aPqDAk",
authDomain: "greendeer30-db004.firebaseapp.com",
projectId: "greendeer30-db004",
storageBucket: "greendeer30-db004.firebasestorage.app",
messagingSenderId: "714289866282",
appId: "1:714289866282:web:4a8d553978833e32b58553",
measurementId: "G-3SBJ0QTJP5"
};
console.log();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(1);
//console.log("Firebase initialized", app.name); // Optional: Check if Firebase is initialized

// Example: Save a lobby name to the database
function saveToFirebase(lobbyName) {
  const db = getDatabase();
  const dbRef = ref(db, "lobbies/" + lobbyName);
  set(dbRef, { createdAt: new Date().toISOString() })
      .then(() => {
          console.log("Lobby saved successfully!");
      })
      .catch((error) => {
          console.error("Error saving lobby:", error);
      });
}
saveToFirebase("testLobby"); // Test function call to save a lobby named "testLobby"
*/