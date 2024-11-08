
// Initialize Firebase
const firebaseConfig = { /* Your Firebase configuration */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Generate a new session
const sessionRef = db.collection("sessions").doc();  // Create new session ID
const sessionId = sessionRef.id; // Unique session ID

// Update session data with QR code link
const qrCodeUrl = `${window.location.origin}/phone/index.html?sessionId=${sessionId}`;
new QRCode(document.getElementById("qrcode"), qrCodeUrl);
sessionRef.set({ status: 'waiting', sessionId });

// Listen for connection confirmation from phone
sessionRef.onSnapshot((doc) => {
  if (doc.exists && doc.data().status === 'connected') {
    window.location.href = "/video.html"; // Redirect main screen
  }
});
