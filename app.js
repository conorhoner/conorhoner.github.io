// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
    // apiKey: "your-api-key",
    // authDomain: "your-auth-domain",
    // projectId: "your-project-id",
    // storageBucket: "your-storage-bucket",
    // messagingSenderId: "your-messaging-sender-id",
    // appId: "your-app-id"
};

// Initialize Firebase
const app = window.initializeApp(firebaseConfig);
const database = window.getDatabase(app);

// Generate a unique session ID
function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Create new session and QR code
async function initializeSession() {
    const sessionId = generateSessionId();
    const sessionRef = ref(database, `sessions/${sessionId}`);
    
    try {
        // Initialize session data
        await set(sessionRef, {
            status: 'waiting',
            currentScene: 'start',
            phoneConnected: false,
            choices: {
                enabled: false,
                selected: null
            }
        });

        // Generate QR code with error handling
        const qrElement = document.getElementById("qrcode");
        qrElement.innerHTML = ''; // Clear any existing QR code
        
        const qrUrl = `${window.location.origin}/mobile.html?session=${sessionId}`;
        new QRCode(qrElement, {
            text: qrUrl,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Store session ID in page
        document.getElementById("sessionId").textContent = sessionId;

        // Listen for phone connection
        onValue(ref(database, `sessions/${sessionId}/phoneConnected`), (snapshot) => {
            if (snapshot.val() === true) {
                window.location.href = `/scene1.html?session=${sessionId}`;
            }
        });

    } catch (error) {
        console.error("Error initializing session:", error);
        alert("Error creating session. Please try refreshing the page.");
    }
}

// Initialize when page loads
window.onload = initializeSession; 