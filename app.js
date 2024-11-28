// Firebase configuration - Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBw3qJqCfZTwkebdTqA29trOc2f3ryhzBY",
    authDomain: "mai-day-film.firebaseapp.com",
    projectId: "mai-day-film",
    storageBucket: "mai-day-film.firebasestorage.app",
    messagingSenderId: "149266649737",
    appId: "1:149266649737:web:a2cf2aef2bea3201d36c58",
    measurementId: "G-5ESLTCVDYY"
};

// Initialize Firebase using window.initializeApp that we exposed
const app = window.initializeApp(firebaseConfig);
const database = window.getDatabase(app);
const auth = window.getAuth(app);
const { ref, set, onValue } = window;

// Generate a unique session ID
function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Create new session and QR code
async function initializeSession() {
    try {
        // Sign in anonymously
        await window.signInAnonymously(auth);
        
        // Wait for auth state to be ready
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const sessionId = generateSessionId();
                const sessionRef = ref(database, `sessions/${sessionId}`);
                
                // Initialize session data with user ID
                await set(sessionRef, {
                    status: 'waiting',
                    currentScene: 'start',
                    phoneConnected: false,
                    userId: user.uid,
                    createdAt: Date.now(),
                    choices: {
                        enabled: false,
                        selected: null
                    }
                });

                // Generate QR code
                const qrElement = document.getElementById("qrcode");
                if (!qrElement) {
                    throw new Error("QR code element not found");
                }
                
                qrElement.innerHTML = ''; // Clear any existing QR code
                
                // Get the full URL for the mobile page
                const currentURL = new URL(window.location.href);
                const baseURL = currentURL.origin;
                const qrUrl = `${baseURL}/mobile.html?session=${sessionId}&auth=${user.uid}`;
                
                console.log('Generating QR code for URL:', qrUrl); // Debug log
                
                // Create QR code with error handling
                try {
                    new QRCode(qrElement, {
                        text: qrUrl,
                        width: 256,
                        height: 256,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                } catch (qrError) {
                    console.error("QR Code generation error:", qrError);
                    qrElement.innerHTML = 'Error generating QR code';
                    return;
                }
                
                // Store session ID in page
                const sessionIdElement = document.getElementById("sessionId");
                if (sessionIdElement) {
                    sessionIdElement.textContent = sessionId;
                }

                // Listen for phone connection
                onValue(ref(database, `sessions/${sessionId}/phoneConnected`), (snapshot) => {
                    if (snapshot.val() === true) {
                        window.location.href = `/scene1.html?session=${sessionId}&auth=${user.uid}`;
                    }
                });
            }
        });

    } catch (error) {
        console.error("Error initializing session:", error);
        alert("Error creating session. Please try refreshing the page.");
    }
}

// Initialize when page loads
window.addEventListener('load', initializeSession); 