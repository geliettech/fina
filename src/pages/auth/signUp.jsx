// import { useState } from "react";
// import { auth, googleProvider } from "../../services/firebase";
// import { Link, Navigate, useNavigate } from "react-router";
// import { useGetUserInfo } from "../../hooks/useGetUserInfo";
// import { useAuth } from "../../layout/context/authProvider";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";


// const SignUp = () => {
//   const navigate = useNavigate();
//   const { isAuth } = useGetUserInfo();
//   const authContext = useAuth();

//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [generalError, setGeneralError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const register = async () => {
//     // reset errors
//     setEmailError("");
//     setPasswordError("");
//     setGeneralError("");

//     // basic client-side validation
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     if (!emailRegex.test(registerEmail)) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }

//     if (!registerPassword || registerPassword.length < 6) {
//       setPasswordError("Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword
//       );

//       const authInfo = {
//         userID: result.user.uid,
//         email: result.user.email,
//         name: result.user.displayName || "",
//         profilePic: result.user.photoURL || "",
//         isAuth: true,
//       };

//       localStorage.setItem("auth", JSON.stringify(authInfo));
//       authContext.login(authInfo);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       const code = err?.code || "unknown";
//       if (code === "auth/invalid-email") setGeneralError("Invalid email address.");
//       else if (code === "auth/email-already-in-use") setGeneralError("An account with this email already exists.");
//       else setGeneralError(err.message || "Sign up failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(
//         auth,
//         googleProvider
//       );

//       const authInfo = {
//         userID: result.user.uid,
//         email: result.user.email,
//         name: result.user.displayName,
//         profilePic: result.user.photoURL,
//         isAuth: true,
//       };

//       localStorage.setItem("auth", JSON.stringify(authInfo));
//       authContext.login(authInfo);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setGeneralError(err.message || "Sign in failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isAuth) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//   <div className="">
//       <div className="container flex items-center justify-between min-h-screen bg-background">
//            <div className="">
//             <img src="" alt="Auth Image" />
//            </div>
//     <div className="flex flex-col">
//       <h2>Sign Up</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         value={registerEmail}
//         onChange={(e) => setRegisterEmail(e.target.value)}
//       />
//       {emailError && <div className="error">{emailError}</div>}

//       <input
//         type="password"
//         placeholder="Password"
//         value={registerPassword}
//         onChange={(e) => setRegisterPassword(e.target.value)}
//       />
//       {passwordError && <div className="error">{passwordError}</div>}

//       {generalError && <div className="error">{generalError}</div>}

//       <button onClick={register} disabled={loading}>
//         {loading ? "Signing up..." : "Sign Up"}
//       </button>

//       <button onClick={signInWithGoogle} disabled={loading}>
//         Sign Up With Google
//       </button>
//       <div className="">
//         Already have an account? 
//         <Link to="/sign-in">Sign In</Link>
//       </div>

//     </div>
//     </div>

//     </div>
//   );
// };

// export default SignUp;
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

import { AuthLayout } from "../../layout/authLayout";

import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

// Validation Schema
const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      console.log("Submitted Data:", data);

      // Call your API here
      // await signup(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      description="Enter your details to create an account"
      footer={
        <>
          <Button
            type="submit"
            form="signup-form"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>

          <CardAction className="flex items-center gap-2">
            <small>Already have an account?</small>

            <Button variant="link" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </CardAction>
        </>
      }
    >
      <form
        id="signup-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FieldGroup>
          {/* Full Name */}
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.fullName}>
                  Full Name
                </FieldLabel>

                <Input
                  {...field}
                  id={field.fullName}
                  placeholder="John Doe"
                  autoComplete="Full Name"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.email}>
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id={field.email}
                  type="email"
                  placeholder="johndoe@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.password}>
                  Password
                </FieldLabel>

                <Input
                  {...field}
                  id={field.password}
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </AuthLayout>
  );
};

export default SignUp;