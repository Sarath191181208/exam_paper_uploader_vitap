"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import "firebase/auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ScriptProps } from "next/script";

// Types for context
type AuthContextType = {
  currentUser: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider: React.FC<ScriptProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Function to handle sign in
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    firebaseSignOut(auth);
  };

  // Effect to set up authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [currentUser]);

  const authContextValue: AuthContextType = {
    currentUser,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
