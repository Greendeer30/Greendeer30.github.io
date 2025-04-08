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
