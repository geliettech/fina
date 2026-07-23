import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "../../layout/dashboard/authLayout";
import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp, signInWithGoogle } from "@/services/auth";
import { toast } from "react-toastify";




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

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      await signUp(
        data.fullName,
        data.email,
        data.password
      );

      toast.success(
        "Account created successfully. Please verify your email."
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      form.reset();
    }
  };


  const handleGoogleSignup = async () => {
    try {
      setLoading(true);

      await signInWithGoogle();

      toast.success("Account created successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      description="Enter your details to create an account"
      imgTitle='Let’s get started' imgSubtitle='Take control of your money with smart tracking and clear insights.'
      footer={
        <>
          <Button
            type="submit" size="lg"
            form="signup-form"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            disabled={loading}
            onClick={handleGoogleSignup}
          >
            {loading ? "Signing..." : "Continue with Google"}
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
                  autoComplete="current-password"
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

export default SignUpPage;