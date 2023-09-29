import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../store/DataContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useData();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      alert("Login successful");
      setUser(response.data.rows[0]);
      setRedirect(true);
    } catch (e) {
      alert("Login failed!");
    }
  }

  if (redirect) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles["login_text"]}>Login</h1>
        <form className={styles.form} onSubmit={handleLoginSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className={styles["login_button"]}>Login</button>
          <div className={styles["no_account"]}>
            Don't have an account yet?{" "}
            <Link className={styles["register_link"]} to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
