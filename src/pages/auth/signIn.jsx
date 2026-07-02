import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { Link, Navigate, useNavigate } from "react-router";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAuth } from "../../layout/context/authProvider";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const authContext = useAuth();

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    // reset errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(logInEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!logInPassword) {
      setPasswordError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        logInEmail,
        logInPassword
      );

      const authInfo = {
        userID: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || "",
        profilePic: result.user.photoURL || "",
        isAuth: true,
      };

      localStorage.setItem("auth", JSON.stringify(authInfo));
      authContext.login(authInfo);
      navigate("/dashboard");
    } catch (err) {
      console.error("signIn error:", err);
      const code = err?.code || "unknown";
      if (code === "auth/invalid-email") setGeneralError("Invalid email address.");
      else if (code === "auth/user-not-found") setGeneralError("No account found for this email.");
      else if (code === "auth/wrong-password") setGeneralError("Incorrect password.");
      else setGeneralError(err.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };
  

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);

      const authInfo = {
        userID: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
        isAuth: true,
      };

      localStorage.setItem("auth", JSON.stringify(authInfo));
      authContext.login(authInfo);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setGeneralError(err.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-card">
      <h2>Sign In</h2>

      <input
        type="email"
        placeholder="Email"
        value={logInEmail}
        onChange={(e) => setLogInEmail(e.target.value)}
      />

      {emailError && <div className="error">{emailError}</div>}

      <input
        type="password"
        placeholder="Password"
        value={logInPassword}
        onChange={(e) => setLogInPassword(e.target.value)}
      />

      {passwordError && <div className="error">{passwordError}</div>}

      {generalError && <div className="error">{generalError}</div>}

      <button onClick={signIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <button onClick={signInWithGoogle} disabled={loading}>
        Sign In With Google
      </button>
      <div className="">
         Don&apos;t have an account?{" "}
           <Link to="/sign-up" className="sign-up-link">
            Sign Up
        </Link>
      </div>
     
    </div>
  );
};

export default SignIn;

