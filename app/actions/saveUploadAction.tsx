"use server";

import { admin } from "app/firebase/firebaseAdmin";
import { FormState } from "app/hooks/uploadPaperForm";
import { getAuth } from "firebase-admin/auth";
import { validateUploadForm } from "../validators/validateUpload";
import { uploadActionStates } from "@/app/actions/actionStates";

const verifyUser = async (token: string) => {
  try {
    const decodedToken = await getAuth(admin).verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token", error);
    return null;
  }
};

export async function uploadAction(formData: FormState, authToken: string) {
  if (!authToken) {
    return {
      state: uploadActionStates.unothorizedToken,
    }
  }

  const user = await verifyUser(authToken);
  if (!user) {
    return {
      state: uploadActionStates.unothorizedToken,
    }
  }

  if (!formData) {
    return {
      state: uploadActionStates.noData,
    }
  }

  const errors = validateUploadForm(formData);
  if (Object.keys(errors).length > 0) {
    return {
      state: uploadActionStates.validationError,
      errors,
    };
  }

  // TODO: check the size of the imagegs


  return {
    state: uploadActionStates.success,
    user,
  };
}
