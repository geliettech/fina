import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// signUp
export const signUp = async ({ email, password }) => {
  try {
    const userCrediential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    sendEmailVerification(userCrediential);

    return userCrediential.user;
  } catch (error) {
    console.error(error);
  }
};

// signIn
export const signIn = async ({ email, password }) => {
  try {
    const userCrediential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCrediential.user;
  } catch (error) {
    console.error(error);
  }
};

// signOut
export const signOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
