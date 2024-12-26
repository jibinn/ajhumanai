// Import Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB60kXXsMSBVZ2UfILe9Uj1ZsQBSQKxWk",
  authDomain: "ajhumanai.firebaseapp.com",
  projectId: "ajhumanai",
  storageBucket: "ajhumanai.appspot.com",
  messagingSenderId: "227628794904",
  appId: "1:227628794904:web:d7447a2e90cbe86a7caf6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const registerForm = document.getElementById('register-form');
const messageElement = document.getElementById('message');

// Handle form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        displayMessage(`Registration successful! Welcome, ${user.email}`);
        setTimeout(() => {
            window.location.href = 'login.html'; // Redirect to login page
        }, 2000);
    } catch (error) {
        displayMessage(`Error: ${error.message}`);
    }
});

function displayMessage(message) {
    messageElement.textContent = message;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
}
