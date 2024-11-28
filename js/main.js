import { db } from './firebase.js';
import { doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const sessionID = new URLSearchParams(window.location.search).get('sessionID');
const sessionRef = doc(db, 'sessions', sessionID);

function showModal() {
  updateDoc(sessionRef, { choicesAvailable: true });
}

// Listen for session updates
onSnapshot(sessionRef, (docSnapshot) => {
  const data = docSnapshot.data();
  if (data.status === "start") {
    console.log("Starting scene 1...");
    window.location.href = "scene1.html";
  }
});
