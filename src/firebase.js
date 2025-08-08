import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIEI_hmNqvRyRv2jlHCO25coJaYQfgOes",
  authDomain: "trip-planner-a4e94.firebaseapp.com",
  projectId: "trip-planner-a4e94",
  storageBucket: "trip-planner-a4e94.appspot.com",
  messagingSenderId: "732971362604",
  // --- PASTE YOUR FULL APP ID HERE ---
  appId: "1:732971362604:web:cf25cb5f78cede077f2489" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
