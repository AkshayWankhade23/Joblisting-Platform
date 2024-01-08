import { useState } from "react";
import styles from "./Style.module.css";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { server } from "../../App";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${server}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Login failed. Please check your credentials.");
        return;
      }

      const responseData = await response.json();
      window.localStorage.setItem("user", responseData.user);
      window.localStorage.setItem("name", responseData.name);
      window.localStorage.setItem("token", responseData.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("There was a problem with the request, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Already have an account?</h1>
      <h2 className={styles.h2}>Your personal job finder is here</h2>
      <input
        className={styles.input}
        name="email"
        value={data.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
      />
      <input
        className={styles.input}
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleSubmit} className={styles.button} disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
      <p className={styles.footer}>
        Don't have an account?
        <span onClick={() => navigate("/register")} className={styles.underline}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

