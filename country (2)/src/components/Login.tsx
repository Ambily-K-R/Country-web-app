import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol");

const loginSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
  password: passwordSchema,
  keepSignedIn: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      keepSignedIn: false,
    },
  });

  const navigate = useNavigate();
  const onSubmit = (data: LoginForm) => {
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign In</h2>
          <div className="login-subtext">
            <span>New user?</span>
            <a href="#" className="create-account">
              Create an account
            </a>
          </div>
          <div className="form-group">
            <input
              type="text"
              {...register("username")}
              placeholder="Username or email"
              autoComplete="username"
            />
            {errors.username && (
              <div className="error-msg">{errors.username.message}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="error-msg">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              {...register("keepSignedIn")}
              id="keepSignedIn"
            />
            <label htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
          <div className="divider">
            <span>Or Sign In With</span>
          </div>
          <div className="social-icons">
            <button
              type="button"
              className="icon-btn"
              aria-label="Sign in with Google"
            >
              <span className="icon-google" />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Sign in with Facebook"
            >
              <span className="icon-facebook" />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Sign in with LinkedIn"
            >
              <span className="icon-linkedin" />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Sign in with Twitter"
            >
              <span className="icon-twitter" />
            </button>
          </div>
        </form>
      </div>
      <div className="login-right">
        <div className="lady-illustration">
          <img
            src="/lady_walking_illustration.png"
            alt="Lady walking illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
