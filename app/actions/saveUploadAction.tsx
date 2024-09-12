"use server";

import { admin } from "app/firebase/firebaseAdmin";
import { FormState } from "app/hooks/uploadPaperForm";
import { getAuth } from "firebase-admin/auth";

const verifyUser = async (token: string) => {
  try {
    const decodedToken = getAuth(admin).verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token", error);
    return null;
  }
};

export async function uploadAction(formData: FormState, authToken: string) {
  if (!authToken) {
    throw new Error("Unauthorized: No auth token");
  }

  const user = await verifyUser(authToken);
  if (!user) {
    throw new Error("Unauthorized: Invalid token");
  }

  return {
    message: "Image uploaded successfully",
    user,
  };
}
