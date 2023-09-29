import React, { useState } from "react";
import styles from "../LoginPage/LoginPage.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleRegisterSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        phoneNumber,
        password,
      });
      alert("Registration successful. Now you can log in.");
      setRedirect(true);
    } catch (e) {
      alert("Registration failed. Please try again later.");
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles["login_text"]}>Sign Up</h1>
        <form className={styles.form} onSubmit={handleRegisterSubmit}>
          <input
            className={styles.input}
            type="name"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className={styles.input}
            type="tel"
            placeholder="123456"
            value={phoneNumber}
            onChange={(ev) => setPhoneNumber(ev.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className={styles["login_button"]}>Register</button>
          <div className={styles["no_account"]}>
            Already a member?{" "}
            <Link className={styles["register_link"]} to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
