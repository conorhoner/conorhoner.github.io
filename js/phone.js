import { db } from "/js/firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

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

async function notifyMainScreen() {
  try {
    const sessionRef = doc(db, "sessions", sessionID);
    await updateDoc(sessionRef, {
      status: "connected",
    });
    console.log("Session status updated to 'connected'");
  } catch (e) {
    console.error("Error updating session status:", e);
  }
}

// Join the session and notify the main screen
joinSession().then(notifyMainScreen);
