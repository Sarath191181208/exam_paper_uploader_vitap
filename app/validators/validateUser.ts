import { getAuth } from "firebase-admin/auth";
import { admin } from "app/firebase/firebaseAdmin";

const verifyUser = async (token: string) => {
  try {
    const decodedToken = await getAuth(admin).verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token", error);
    return null;
  }
};

//type UserValidatorResult Promise<keyof typeof uploadActionStates | null>;

export async function validateUser(
  authToken: string,
){
  if (!authToken) {
    return { errState: "unothorizedToken"};
  }

  const user = await verifyUser(authToken);
  if (!user) {
    return { errState: "unothorizedToken"};
  }

  return { errState : null, user};
}
