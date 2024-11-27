
// Initialize Firebase
const firebaseConfig = { /* Your Firebase configuration */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Generate a new session
const sessionRef = db.collection("sessions").doc();  // Create new session ID
const sessionId = sessionRef.id; // Unique session ID

// Update session data with QR code link
const qrCodeUrl = `${window.location.origin}/phone/phoneindex.html?sessionId=${sessionId}`;
new QRCode(document.getElementById("qrcode"), qrCodeUrl);
sessionRef.set({ status: 'waiting', sessionId })
  .catch(error => {
    console.error("Error setting session data:", error);
  });

// Listen for connection confirmation from phone
sessionRef.onSnapshot((doc) => {
  if (doc.exists) {
    console.log("Session document updated:", doc.data());
    if (doc.data().status === 'connected') {
      window.location.href = "/video.html"; // Redirect main screen to video.html when paired
    }
  } else {
    console.warn("Session document deleted or not found.");
  }
});

// Session timeout after 5 minutes
setTimeout(() => {
  sessionRef.get().then(doc => {
    if (doc.exists && doc.data().status === 'waiting') {
      sessionRef.delete();
      alert("Session expired. Please try again.");
    }
  }).catch(error => console.error("Error checking session timeout:", error));
}, 300000); // 5 minutes
