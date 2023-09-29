import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

const calculateCardValues = (data) => {
  const activeUsersList = data.map((record) => record.activeusers);
  const totalActiveUsers = activeUsersList?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const revenueList = data.map((record) => record.totalrevenue);
  const totalRevenue = revenueList?.reduce((acc, curr) => acc + curr, 0);

  const sessionDurationList = data.map(
    (record) => record.averagesessionduration
  );
  const sumOfSessionDuration = sessionDurationList?.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const avgSessionDuration = Math.round(
    sumOfSessionDuration / sessionDurationList.length
  );

  const screenPageViewsList = data.map((record) => record.screenpageviews);
  const totalScreenPageViews = screenPageViewsList?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  return {
    activeUsers: totalActiveUsers || 0,
    totalRevenue: totalRevenue || 0,
    sessionDuration: avgSessionDuration || 0,
    screenPageViews: totalScreenPageViews || 0,
  };
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const [cardValues, setCardValues] = useState({
    activeUsers: 0,
    totalRevenue: 0,
    sessionDuration: 0,
    screenPageViews: 0,
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState(null);

  if (startDate === "" && endDate === "") {
    setStartDate("2023-09-20");
    setEndDate("2023-09-21");
  }

  useEffect(() => {
    axios.get("/profile").then(({ data }) => setUser(data));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          startDate,
          endDate,
        };

        const response = await axios.post("bigquery", requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setData(response.data);

        const newCardValues = calculateCardValues(response.data);
        setCardValues(newCardValues);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const value = {
    data,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    cardValues,
    user,
    setUser,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
