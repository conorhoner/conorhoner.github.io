import { db } from './firebase.js';
import { doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const sessionID = new URLSearchParams(window.location.search).get('sessionID');
const sessionRef = doc(db, 'sessions', sessionID);

function showModal() {
  updateDoc(sessionRef, { choicesAvailable: true });
}

onSnapshot(sessionRef, (doc) => {
  const data = doc.data();
  if (data.choice === 'A') {
    window.location.href = 'scene1A.html';
  } else if (data.choice === 'B') {
    window.location.href = 'scene1B.html';
  }
});