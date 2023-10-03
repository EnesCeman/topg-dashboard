import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../store/DataContext";

import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          <div className={styles.login_password_container}>
            <input
              className={styles.input}
              type={!showPassword ? "password" : "text"}
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <div
              className={styles.visibility_icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </div>
          </div>

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
