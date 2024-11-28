// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

class SceneController {
    constructor() {
        this.sessionId = new URLSearchParams(window.location.search).get('session');
        this.sessionRef = database.ref(`sessions/${this.sessionId}`);
        this.video = document.getElementById('sceneVideo');
        this.modal = document.getElementById('choiceModal');
        this.init();
    }

    init() {
        // When video ends, show modal and enable choices
        this.video.addEventListener('ended', () => {
            this.modal.style.display = 'block';
            this.sessionRef.update({
                'choices/enabled': true
            });
        });

        // Listen for choice selection
        this.sessionRef.child('choices/selected').on('value', (snapshot) => {
            const choice = snapshot.val();
            if (choice) {
                window.location.href = `/scene1${choice}.html?session=${this.sessionId}`;
            }
        });

        // Start playing the video
        this.video.play();
    }
}

// Initialize when page loads
window.onload = () => new SceneController(); 