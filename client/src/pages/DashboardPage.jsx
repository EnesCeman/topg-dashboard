import React, { useState } from "react";
import Header from "../components/Header/Header";
import DateCards from "../containers/DateCards/DateCards";
import Charts from "../components/Charts/Charts";
import { useData } from "../store/DataContext";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useData();

  if (user === null) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <DateCards />
      <Charts />
    </>
  );
};

export default DashboardPage;
