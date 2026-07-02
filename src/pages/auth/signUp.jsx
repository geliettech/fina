import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { Link, Navigate, useNavigate } from "react-router";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAuth } from "../../layout/context/authProvider";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";


const SignUp = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const authContext = useAuth();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    // reset errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // basic client-side validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(registerEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!registerPassword || registerPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
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
      console.error(err);
      const code = err?.code || "unknown";
      if (code === "auth/invalid-email") setGeneralError("Invalid email address.");
      else if (code === "auth/email-already-in-use") setGeneralError("An account with this email already exists.");
      else setGeneralError(err.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const authInfo = {
        userID: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
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
      <h2>Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      {emailError && <div className="error">{emailError}</div>}

      <input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      {passwordError && <div className="error">{passwordError}</div>}

      {generalError && <div className="error">{generalError}</div>}

      <button onClick={register} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <button onClick={signInWithGoogle} disabled={loading}>
        Sign Up With Google
      </button>
      <div className="">
        Already have an account? 
        <Link to="/sign-in">Sign In</Link>
      </div>
      
    </div>
  );
};

export default SignUp;