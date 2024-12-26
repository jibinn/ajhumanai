// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB60kXXsMSBVZ2UfILe9Uj1ZsQBSQKxWk",
  authDomain: "ajhumanai.firebaseapp.com",
  projectId: "ajhumanai",
  storageBucket: "ajhumanai.appspot.com",
  messagingSenderId: "227628794904",
  appId: "1:227628794904:web:d7447a2e90cbe86a7caf6d",
  measurementId: "G-1P7TVZ9MNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the app and auth for use in other files
export { app, auth };
