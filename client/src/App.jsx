import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { DataProvider } from "./store/DataContext";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

if (import.meta.env.VITE_BASE_URL === undefined) {
  axios.defaults.baseURL = "http://localhost:5000/api";
}

axios.defaults.withCredentials = true;

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
