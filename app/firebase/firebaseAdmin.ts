import { App, cert, ServiceAccount } from "firebase-admin/app";
import fadmin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const firebaseOptions: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: privateKey,
};

function getAdmin(): App {
  if (fadmin.apps.length === 0) {
    return fadmin.initializeApp({
      credential: cert(firebaseOptions),
    });
  }
  return fadmin.app();
}

export const admin = getAdmin();
export const firestoreAdmin = getFirestore(admin);
