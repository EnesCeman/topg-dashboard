import {
  SearchOutlined as SearchOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
} from "@mui/icons-material";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <SearchOutlinedIcon className={styles["material-icons-outlined"]} />
        </div>
        <div className={styles["header-right"]}>
          <NotificationsOutlinedIcon
            className={styles["material-icons-outlined"]}
          />
          <EmailOutlinedIcon className={styles["material-icons-outlined"]} />
          <AccountCircleOutlinedIcon
            className={styles["material-icons-outlined"]}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
