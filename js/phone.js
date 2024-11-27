import { db } from './firebase.js';
import { doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const sessionID = new URLSearchParams(window.location.search).get('sessionID');
const sessionRef = doc(db, 'sessions', sessionID);

onSnapshot(sessionRef, (doc) => {
  const data = doc.data();
  if (data.choicesAvailable) {
    document.getElementById('status').style.display = 'none';
    document.getElementById('choices').style.display = 'block';
  }
});

function makeChoice(choice) {
  updateDoc(sessionRef, { choice });
}