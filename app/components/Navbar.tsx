"use client"

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

"rounded-circle";

export const Navbar = () => {
  //const { user, signInWithGoogle, signOutWithGoogle } = useAuth();
  const {
    currentUser: user,
    signIn: signInWithGoogle,
    signOut: signOutWithGoogle,
  } = useAuth();
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutWithGoogle();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center bg-black/20 p-3">
      <div className="flex flex-row gap-4 items-center">
        {/* showing the image  */}
        {user
          ? (
            <Image
              src={user.photoURL ?? ""}
              alt={user.displayName ?? ""}
              width={30}
              height={30}
              className="rounded-full"
            />
          )
          : <></>}
        {/* showing the name */}
        {user
          ? <p className="text-xl cursor-default">{user.displayName}</p>
          : <></>}
      </div>
      <div className="flex flex-row gap-4 items-center">
        {/* showing the login button */}
        {user
          ? (
            <button
              className="border-slate-500 border-2 text-xs transition hover:bg-slate-600/40 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )
          : (
            <button
              className="border-slate-400 border-2 text-xs transition hover:bg-slate-600/40 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
      </div>
    </div>
  );
};
