import { useData } from "../../store/DataContext";
import styles from "./Cards.module.css";
import {
  GroupAddOutlined as GroupAddOutlinedIcon,
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  PlayCircleOutlined as PlayCircleOutlinedIcon,
} from "@mui/icons-material";

export default function Cards() {
  const { cardValues } = useData();

  return (
    <main className={styles["main-container"]}>
      <div className={styles["main-cards"]}>
        <div className={styles.card}>
          <div className={styles["card-inner"]}>
            <h3>ACTIVE USERS</h3>
            <GroupAddOutlinedIcon
              className={styles["material-icons-outlined"]}
            />
          </div>
          <h1 className={styles["card-value"]}>{cardValues.activeUsers}</h1>
        </div>
        <div className={styles.card}>
          <div className={styles["card-inner"]}>
            <h3>TOTAL REVENUE</h3>
            <MonetizationOnOutlinedIcon
              className={styles["material-icons-outlined"]}
            />
          </div>
          <h1 className={styles["card-value"]}>$ {cardValues.totalRevenue}</h1>
        </div>
        <div className={styles.card}>
          <div className={styles["card-inner"]}>
            <h3>AVG SESSION DURATION</h3>
            <AccessTimeOutlinedIcon
              className={styles["material-icons-outlined"]}
            />
          </div>
          <h1 className={styles["card-value"]}>
            {cardValues.sessionDuration}{" "}
            <span className={styles["small-value"]}>seconds</span>
          </h1>
        </div>
        <div className={styles.card}>
          <div className={styles["card-inner"]}>
            <h3>SCREEN PAGE VIEWS</h3>
            <PlayCircleOutlinedIcon
              className={styles["material-icons-outlined"]}
            />
          </div>
          <h1 className={styles["card-value"]}>{cardValues.screenPageViews}</h1>
        </div>
      </div>
    </main>
  );
}
