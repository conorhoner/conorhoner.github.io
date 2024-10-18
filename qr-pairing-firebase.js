
// Firebase config from your Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyA7LgxW9RMWC_0s-0Ovw_2v037glMMFOEY",
    authDomain: "mai-day.firebaseapp.com",
    databaseURL: "https://mai-day-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mai-day",
    storageBucket: "mai-day.appspot.com",
    messagingSenderId: "78051109148",
    appId: "1:78051109148:web:fdaa31b2919e7fc0e6b2d9",
    measurementId: "G-3S05BDT6K9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to generate a unique session ID
function generateSessionId() {
    return Math.random().toString(36).substring(2, 15);  // Simple random session ID
}

let sessionId = generateSessionId();

// Generate the QR code URL for the phone to scan
let qrCodeUrl = "https://lightgray-mole-832128.hostingersite.com/phone/index.html?session=" + sessionId;

let qrCodeContainer = document.getElementById("qrCode");
let qrCode = new QRCode(qrCodeContainer, {
    text: qrCodeUrl,
    width: 200,
    height: 200
});

// Listen for changes in the choice made by the phone
firebase.database().ref("sessions/session_id").on("value", function(snapshot) {
    let userChoice = snapshot.val().choice;
    console.log("Choice received:", userChoice);

    // Handle video logic based on the choice
    if (userChoice === '1A') {
        console.log("Playing Scene 1A");
        // Logic to play Scene 1A
    } else if (userChoice === '1B') {
        console.log("Playing Scene 1B");
        // Logic to play Scene 1B
    }
});
