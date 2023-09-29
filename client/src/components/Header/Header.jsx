import {
  SearchOutlined as SearchOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
} from "@mui/icons-material";

import styles from "./Header.module.css";
import { useData } from "../../store/DataContext";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Header = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser } = useData();

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(undefined);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <SearchOutlinedIcon className={styles["material-icons-outlined"]} />
        </div>
        <div className={styles["header-right"]}>
          <div className={styles.user}>
            <AccountCircleOutlinedIcon
              className={styles["material-icons-outlined"]}
            />
            <span>{user?.email}</span>
          </div>
          <button className={styles.logout_button} onClick={logout}>
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
