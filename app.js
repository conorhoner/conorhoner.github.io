// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Generate a unique session ID
function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Create new session and QR code
async function initializeSession() {
    const sessionId = generateSessionId();
    const sessionRef = database.ref(`sessions/${sessionId}`);
    
    // Initialize session data
    await sessionRef.set({
        status: 'waiting',
        currentScene: 'start',
        phoneConnected: false,
        choices: {
            enabled: false,
            selected: null
        }
    });

    // Generate QR code
    const qrUrl = `${window.location.origin}/mobile.html?session=${sessionId}`;
    new QRCode(document.getElementById("qrcode"), qrUrl);
    
    // Store session ID in page
    document.getElementById("sessionId").textContent = sessionId;

    // Listen for phone connection
    sessionRef.child('phoneConnected').on('value', (snapshot) => {
        if (snapshot.val() === true) {
            window.location.href = `/scene1.html?session=${sessionId}`;
        }
    });
}

// Initialize when page loads
window.onload = initializeSession; 