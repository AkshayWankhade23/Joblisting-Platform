import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";
import { toast } from "react-hot-toast";
import { server } from "../../App";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.name || !data.mobile || !data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Send the POST Request
    try {
      const response = await fetch(`${server}/api/auth/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
        return;
      }

      const responseData = await response.json();
      // console.log(responseData);
      window.localStorage.setItem("user", responseData.user.email);
      window.localStorage.setItem("name", responseData.user.name);
      window.localStorage.setItem("token", responseData.token);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      // alert("There was a problem with the request, please try again");
      toast.error("There was a problem with the request, please try again");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Create an account</h1>
      <h2 className={styles.h2}>Your personal job finder is here</h2>
      <input
        className={styles.input}
        name="name"
        value={data.name}
        onChange={handleChange}
        type={"text"}
        placeholder="Name"
      ></input>
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
        name="mobile"
        value={data.mobile}
        onChange={handleChange}
        type={"tel"}
        placeholder="Mobile"
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
        Create Account
      </button>
      <p className={styles.footer}>
        Already have an account?
        <span onClick={() => navigate("/login")} className={styles.underline}>
          Sign in
        </span>
      </p>
    </div>
  );
};
