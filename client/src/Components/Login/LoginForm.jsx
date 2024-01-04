import { useState } from "react";
import styles from "./Style.module.css";
import { useNavigate } from "react-router";
import {toast} from "react-hot-toast";
import { server } from "../../App";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.email && data.password) {
      try {
        const response = await fetch(`${server}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        // console.log(responseData);
        window.localStorage.setItem("user", responseData.user);
        window.localStorage.setItem("name", responseData.name);
        window.localStorage.setItem("token", responseData.token);
        toast.success("Login successful!")
        navigate("/listing");
      } catch (error) {
        // alert("There was a problem with the request, please try again");
        toast.error("There was a problem with the request, please try again");
        console.log(error);
      }
    } else {
      // alert("Please fill in both fields.");
      toast.error("Please fill in both fields.")
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Already have an account ?</h1>
      <h2 className={styles.h2}>Your personal job finder is here</h2>
      <input
        className={styles.input}
        name="email"
        value={data.email}
        onChange={handleChange}
        type={"email"}
        placeholder="Email"
      ></input>
      <input
        className={styles.input}
        name="password"
        value={data.password}
        onChange={handleChange}
        type={"password"}
        placeholder="Password"
      ></input>
      <button onClick={handleSubmit} className={styles.button}>
        Sign in
      </button>
      <p className={styles.footer}>
        Don&apos;t have an account?
        <span
          onClick={() => navigate("/register")}
          className={styles.underline}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};
