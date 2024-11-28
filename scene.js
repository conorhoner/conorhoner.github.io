// Firebase configuration
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

class SceneController {
    constructor() {
        this.sessionId = new URLSearchParams(window.location.search).get('session');
        this.authId = new URLSearchParams(window.location.search).get('auth');
        this.sessionRef = ref(database, `sessions/${this.sessionId}`);
        this.video = document.getElementById('sceneVideo');
        this.modal = document.getElementById('choiceModal');
        this.init();
    }

    async init() {
        try {
            // Sign in anonymously with the provided auth ID
            await window.signInAnonymously(auth);
            
            auth.onAuthStateChanged(async (user) => {
                if (user && user.uid === this.authId) {
                    // When video ends, show modal and enable choices
                    this.video.addEventListener('ended', () => {
                        this.modal.style.display = 'block';
                        update(this.sessionRef, {
                            'choices/enabled': true
                        });
                    });

                    // Listen for choice selection
                    onValue(ref(database, `sessions/${this.sessionId}/choices/selected`), (snapshot) => {
                        const choice = snapshot.val();
                        if (choice) {
                            window.location.href = `/scene1${choice}.html?session=${this.sessionId}&auth=${this.authId}`;
                        }
                    });

                    // Start playing the video
                    this.video.play();
                }
            });
        } catch (error) {
            console.error("Error initializing scene controller:", error);
        }
    }
}

// Initialize when page loads
window.onload = () => new SceneController(); 