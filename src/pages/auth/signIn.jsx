import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "@/layout/dashboard/authLayout";
import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  signIn,
  signInWithGoogle,
  forgotPassword,
} from "@/services/auth";
import { toast } from "react-toastify";

// Validation Schema
const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});


const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await signIn(data.email, data.password);

      toast.success("Sign-in successfully, Welcome Back!");
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      await signInWithGoogle();

      toast.success("Signed in successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getValues("email");

    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      await forgotPassword(email);

      toast.success("Password reset email sent.");
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <AuthLayout
      title="Sign In"
      description="Enter your details to sign in to your account"
      imgTitle='Welcome back' imgSubtitle='Pick up where you left off and keep your finances on track.'
      footer={
        <>
          <Button
            type="submit" size="lg"
            form="signin-form"
            className="w-full"
            disabled={loading}
          >
            {loading ? "signing in..." : "Sign In"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            disabled={loading}
            onClick={handleGoogleSignIn}
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>

          <CardAction className="flex items-center gap-2">
            <small>Don't have an account?</small>

            <Button variant="link" asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </CardAction>
        </>
      }
    >
      <form
        id="signin-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FieldGroup>

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
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="px-0"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
          </div>
        </FieldGroup>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;