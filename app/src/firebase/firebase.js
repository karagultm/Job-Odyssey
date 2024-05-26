// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeQSm11ZHDT3KrIjKFQU4LIY00ICX0ba4",
  authDomain: "jobodyssey-48fef.firebaseapp.com",
  projectId: "jobodyssey-48fef",
  storageBucket: "jobodyssey-48fef.appspot.com",
  messagingSenderId: "64399122280",
  appId: "1:64399122280:web:a1e1eb89e634f3f62500dd",
  measurementId: "G-EJS8LXVPNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize auth, firestore, and storage separately
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);