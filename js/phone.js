
import { db } from "/js/firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Extract session ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const sessionID = urlParams.get("sessionID");

if (!sessionID) {
  alert("No session ID found in the URL. Please try scanning the QR code again.");
  throw new Error("Session ID missing from URL.");
}

// Join the session
async function joinSession() {
  try {
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

// Notify the main screen to start
async function startMainScreen() {
  try {
    const sessionRef = doc(db, "sessions", sessionID);
    await updateDoc(sessionRef, { status: "start" });
    console.log("Main screen notified to start.");
  } catch (e) {
    console.error("Error updating session status:", e);
  }
}

// Attach the startMainScreen function to the button
document.getElementById("startButton").addEventListener("click", startMainScreen);

joinSession();
