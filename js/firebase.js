// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

// Your Firebase configuration (replace placeholders with your actual details)
const firebaseConfig = {
  apiKey: "AIzaSyBw3qJqCfZTwkebdTqA29trOc2f3ryhzBY",
  authDomain: "mai-day-film.firebaseapp.com",
  projectId: "mai-day-film",
  storageBucket: "mai-day-film.firebasestorage.app",
  messagingSenderId: "149266649737",
  appId: "1:149266649737:web:a2cf2aef2bea3201d36c58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Authenticate the user anonymously
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });

// Export the database for use elsewhere
export { db };
