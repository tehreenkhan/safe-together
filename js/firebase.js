// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
//import { firestoreDB } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPHZ0eol-QZjD11gBPKUwWv0IJ5zH5Fk4",
    authDomain: "safe-together-cps731.firebaseapp.com",
    projectId: "safe-together-cps731",
    storageBucket: "safe-together-cps731.appspot.com",
    messagingSenderId: "1032400666169",
    appId: "1:1032400666169:web:c2aaf71c0f247bdf1657e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log("DB connected");