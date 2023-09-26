import { useData } from "../../store/DataContext";
import styles from "./DatePick.module.css";

export default function DatePick() {
  const { startDate, endDate, setStartDate, setEndDate } = useData();

  return (
    <div className={styles.main}>
      <div className={styles["main-title"]}>
        <h2>TOPG DASHBOARD</h2>
      </div>
      <div className={styles["datepick-container"]}>
        <div className="start-date">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          ></input>
        </div>
        <div className="end-date">
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}
