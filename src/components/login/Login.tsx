import { toast } from "react-toastify";
import styles from "./Login.module.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = localStorage.getItem("auth") === "true";
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    if (
      username === import.meta.env.VITE_USERNAME &&
      password === import.meta.env.VITE_PASSWORD
    ) {
      localStorage.setItem("auth", "true");
      toast.success("Logged in successfully");
      window.location.href = "/";
    } else {
      toast.error("Invalid username or password");
    }
  };
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.backgroundAnimation}></div>
      <form onSubmit={handleLoginFormSubmit} className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={styles.input}
        />
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            name="password"
          />
          <span
            className={styles.passwordToggleIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
