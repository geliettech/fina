import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { auth, googleProvider } from "./firebase";

// =======================
// Sign Up
// =======================
export const signUp = async (fullName, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredential.user, {
    displayName: fullName,
  });

  await sendEmailVerification(userCredential.user);

  return userCredential.user;
};

// =======================
// Sign In
// =======================
export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};

// =======================
// Google Sign In
// =======================
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  return result.user;
};

// =======================
// Forgot Password
// =======================
export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

// =======================
// Logout
// =======================
export const signOutUser = async () => {
  await signOut(auth);
};
