// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

class MobileController {
    constructor() {
        this.sessionId = new URLSearchParams(window.location.search).get('session');
        this.sessionRef = database.ref(`sessions/${this.sessionId}`);
        this.init();
    }

    async init() {
        // Mark phone as connected
        await this.sessionRef.update({ phoneConnected: true });

        // Listen for choice availability
        this.sessionRef.child('choices/enabled').on('value', (snapshot) => {
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

    async makeChoice(choice) {
        await this.sessionRef.update({
            'choices/selected': choice
        });
    }
}

// Initialize when page loads
window.onload = () => new MobileController(); 