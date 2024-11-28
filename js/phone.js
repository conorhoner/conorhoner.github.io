import { db } from "/js/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Extract session ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const sessionID = urlParams.get("sessionID");

if (!sessionID) {
  alert("No session ID found in the URL. Please try scanning the QR code again.");
  throw new Error("Session ID missing from URL.");
}

async function joinSession() {
  try {
    // Fetch the existing session from Firestore
    const sessionRef = doc(db, "sessions", sessionID);
    const sessionSnap = await getDoc(sessionRef);

    if (sessionSnap.exists()) {
      console.log("Joined session:", sessionSnap.data());
    } else {
      console.error("No such session found!");
      alert("The session does not exist. Please try again.");
    }
  } catch (e) {
    console.error("Error joining session:", e);
  }
}

joinSession();

// Attach the startMainScreen function to the button
document.getElementById("startButton").addEventListener("click", startMainScreen);
