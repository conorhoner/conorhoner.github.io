import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBw3qJqCfZTwkebdTqA29trOc2f3ryhzBY",
  authDomain: "mai-day-film.firebaseapp.com",
  projectId: "mai-day-film",
  storageBucket: "mai-day-film.firebasestorage.app",
  messagingSenderId: "149266649737",
  appId: "1:149266649737:web:a2cf2aef2bea3201d36c58",
  measurementId: "G-5ESLTCVDYY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
