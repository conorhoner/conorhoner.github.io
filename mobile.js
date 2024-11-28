const firebaseConfig = {
    apiKey: "AIzaSyBw3qJqCfZTwkebdTqA29trOc2f3ryhzBY",
    authDomain: "mai-day-film.firebaseapp.com",
    projectId: "mai-day-film",
    storageBucket: "mai-day-film.firebasestorage.app",
    messagingSenderId: "149266649737",
    appId: "1:149266649737:web:a2cf2aef2bea3201d36c58",
    measurementId: "G-5ESLTCVDYY"
};

const app = window.initializeApp(firebaseConfig);
const database = window.getDatabase(app);
const auth = window.getAuth(app);
const { ref, update, onValue } = window;

class MobileController {
    constructor() {
        this.sessionId = new URLSearchParams(window.location.search).get('session');
        this.authId = new URLSearchParams(window.location.search).get('auth');
        this.sessionRef = ref(database, `sessions/${this.sessionId}`);
        this.init();
    }

    async init() {
        try {
            // Sign in anonymously with the provided auth ID
            await window.signInAnonymously(auth);
            
            auth.onAuthStateChanged(async (user) => {
                if (user && user.uid === this.authId) {
                    // Mark phone as connected
                    await update(this.sessionRef, { phoneConnected: true });

                    // Listen for choice availability
                    onValue(ref(database, `sessions/${this.sessionId}/choices/enabled`), (snapshot) => {
                        const choicesEnabled = snapshot.val();
                        document.getElementById('waiting-message').style.display = 
                            choicesEnabled ? 'none' : 'block';
                        document.getElementById('choices').style.display = 
                            choicesEnabled ? 'block' : 'none';
                    });

                    // Set up choice buttons
                    document.getElementById('choiceA').addEventListener('click', () => 
                        this.makeChoice('A'));
                    document.getElementById('choiceB').addEventListener('click', () => 
                        this.makeChoice('B'));
                }
            });
        } catch (error) {
            console.error("Error initializing mobile controller:", error);
        }
    }

    async makeChoice(choice) {
        try {
            await update(this.sessionRef, {
                'choices/selected': choice
            });
        } catch (error) {
            console.error("Error making choice:", error);
        }
    }
}

// Initialize when page loads
window.onload = () => new MobileController(); 