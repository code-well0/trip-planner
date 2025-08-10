import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiVjM54cFxvjOf-1Egqhr3XrlCNu_I3WQ",
  authDomain: "trip-planner-bad2b.firebaseapp.com",
  projectId: "trip-planner-bad2b",
  storageBucket: "trip-planner-bad2b.firebasestorage.app",
  messagingSenderId: "731808227250",
  appId: "1:731808227250:web:a5e9434d6148c1139b8eab",
  measurementId: "G-L8FNY7BHSX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);