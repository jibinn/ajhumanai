// Import Firebase functions
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { app } from '../ThreeJs-Animation-Scroll/firebase-config';

const auth = getAuth(app);

// DOM Elements
let formTitle, userForm, formButton, googleLoginButton, messageElement, toggleText;

// Ensure DOM is fully loaded before referencing DOM elements
document.addEventListener('DOMContentLoaded', () => {
    formTitle = document.getElementById('form-title');
    userForm = document.getElementById('user-form');
    formButton = document.getElementById('form-button');
    googleLoginButton = document.getElementById('google-login');
    messageElement = document.getElementById('message');
    toggleText = document.getElementById('toggle-text'); // Ensure toggleText element exists

    // Initialize event listeners after DOM is loaded
    if (userForm) {
        userForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', handleGoogleLogin);
    }

    document.addEventListener('click', toggleFormMode);
});

// Toggle state between Login and Register
let isLoginMode = true;

// Handle Form Submit
async function handleFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLoginMode) {
            console.log("Attempting login");
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            displayMessage(`Welcome back, ${userCredential.user.email}!`);
        } else {
            console.log("Attempting registration");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            displayMessage(`Account created for ${userCredential.user.email}. You can now log in.`);
            toggleToLogin();  // Switch to login mode after successful registration
        }
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            displayMessage('Error: No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
            displayMessage('Error: Incorrect password. Please try again.');
        } else {
            displayMessage(`Error: ${error.message}`);
        }
        console.error("Login error:", error);
    }
}

// Google Login
async function handleGoogleLogin() {
    console.log("Google login clicked");
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        displayMessage(`Welcome, ${result.user.displayName}!`);
    } catch (error) {
        console.error("Google login error:", error);
        displayMessage(`Error: ${error.message}`);
    }
}

// Functions to toggle between login and register modes
function toggleFormMode(e) {
    if (e.target && e.target.id === 'toggle-link') {
        e.preventDefault();
        if (isLoginMode) {
            toggleToRegister();
        } else {
            toggleToLogin();
        }
    }
}

function toggleToRegister() {
    console.log("Switching to Register mode");
    isLoginMode = false;
    formTitle.textContent = 'Register';
    formButton.textContent = 'Register';
    toggleText.innerHTML = `Already have an account? <a id="toggle-link" href="#">Login here</a>`;
}

function toggleToLogin() {
    console.log("Switching to Login mode");
    isLoginMode = true;
    formTitle.textContent = 'Login';
    formButton.textContent = 'Login';
    toggleText.innerHTML = `Don't have an account? <a id="toggle-link" href="#">Register here</a>`;
}

// Helper Function to Display Messages
function displayMessage(message) {
    if (messageElement) {
        messageElement.textContent = message;
        setTimeout(() => {
            messageElement.textContent = '';
        }, 5000);
    } else {
        console.error("Message element not found!");
    }
}
