import React, { useState } from "react";
import styles from "../LoginPage/LoginPage.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [declineNumber, setDeclineNumber] = useState(false);

  {
    console.log(declineNumber);
  }

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleNameChange = (ev) => {
    const value = ev.target.value;
    setName(value);
    setNameValid(value.trim() !== "");
  };

  const handleEmailChange = (ev) => {
    const value = ev.target.value;
    setEmail(value);
    setEmailValid(/\S+@\S+\.\S+/.test(value));
  };

  const handlePasswordChange = (ev) => {
    const value = ev.target.value;
    setPassword(value);
    setPasswordValid(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?]).{8,}$/.test(value)
    );
  };

  const isButtonDisabled = !(nameValid && emailValid && passwordValid);

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

  const handleDeclineNumber = () => {
    setDeclineNumber(!declineNumber);
    setPhoneNumber("");
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles["login_text"]}>Sign Up</h1>
        <form className={styles.form} onSubmit={handleRegisterSubmit}>
          <div className={styles.input_container}>
            <div className={styles.input_fulfilled}>
              <input
                className={styles.input}
                type="name"
                placeholder="First and Last Name*"
                value={name}
                onChange={handleNameChange}
              />
              {nameValid && <CheckCircleIcon className={styles.check_icon} />}
            </div>

            {!nameValid && (
              <span className={styles.error}>* Name is required</span>
            )}
          </div>
          <div className={styles.input_container}>
            <div className={styles.input_fulfilled}>
              <input
                className={styles.input}
                type="email"
                placeholder="your@email.com*"
                value={email}
                onChange={handleEmailChange}
              />
              {emailValid && <CheckCircleIcon className={styles.check_icon} />}
            </div>
            {!emailValid && (
              <span className={styles.error}>* Enter a valid email</span>
            )}
          </div>
          {!declineNumber && (
            <div className={styles.phone_container}>
              <PhoneInput
                className={styles.phone_input}
                enableSearch={true}
                country={"ba"}
                value={phoneNumber}
                placeholder="Phone number (optional)"
                onChange={(phone) => setPhoneNumber(phone)}
              />
            </div>
          )}
          <div className={styles.show_number}>
            <input
              type="checkbox"
              checked={declineNumber}
              onChange={handleDeclineNumber}
            />
            <label className={styles.message}>
              I don't want to provide a phone number
            </label>
          </div>
          <div className={styles.input_container}>
            <div className={styles.input_fulfilled}>
              <div className={styles.login_password_container}>
                <input
                  className={styles.input}
                  type={!showPassword ? "password" : "text"}
                  placeholder="Password*"
                  value={password}
                  onChange={handlePasswordChange}
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
              {passwordValid && (
                <CheckCircleIcon className={styles.check_icon} />
              )}
            </div>
            {!passwordValid && (
              <span className={styles.error}>
                * Password must be at least 8 characters long, contain one
                lowercase letter, one uppercase letter, one digit, and one
                special character (!, @, #, or ?).
              </span>
            )}
          </div>
          <button
            className={styles["login_button"]}
            disabled={isButtonDisabled}
          >
            Register
          </button>
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
