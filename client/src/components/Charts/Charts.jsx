import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./Charts.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useData } from "../../store/DataContext";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  ChartDataLabels
);

export default function Charts() {
  const { startDate, endDate } = useData();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold",
          size: "15px",
        },
        anchor: "end",
        offset: -22,
        align: "start",
        formatter: (value) => value,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: "12px",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          color: "white",
          font: {
            size: "12px",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          startDate,
          endDate,
        };

        const response = await axios.post("/activebybrowser", requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data;

        const browserList = data.map((record) => record.browser);
        const activeUsersList = data.map((record) => record.activeusers);

        setChartData({
          labels: browserList,
          datasets: [
            {
              data: activeUsersList,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      } catch (err) {
        console.error("error fetching data for charts", err);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className={styles.charts}>
      <div className={styles["charts-card"]}>
        <h2 className={styles["chart-title"]}>Active Users By Browser</h2>
        <div className={styles["bar-chart"]}>
          {chartData && (
            <Bar options={options} data={chartData} updateMode="resize" />
          )}
        </div>
      </div>
    </div>
  );
}
