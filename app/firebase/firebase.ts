import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkTl2O1P7YcDxtGrg0PkNbXyGpPhGpmgc",
  authDomain: "test-c8bdd.firebaseapp.com",
  projectId: "test-c8bdd",
  storageBucket: "test-c8bdd.appspot.com",
  messagingSenderId: "612804353728",
  appId: "1:612804353728:web:ea28434028b84293909725",
  measurementId: "G-47NJRR7MFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
