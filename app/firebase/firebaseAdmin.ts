import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";

const firebaseOptions: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

export const admin = initializeApp({
  credential: cert(firebaseOptions),
}, process.env.FIREBASE_PROJECT_ID);
