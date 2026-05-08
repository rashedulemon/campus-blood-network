import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyADuyUsL_nHhf1be9tXa9ERb03t-7DeeyE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blooddonation-5ae38.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blooddonation-5ae38",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blooddonation-5ae38.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "920228115553",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:920228115553:web:1a5008e2fcb98ba427a620"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
