import "./App.css";
import Header from "./components/Header/Header";
import Charts from "./components/Charts/Charts";
import DateCards from "./containers/DateCards/DateCards";
import axios from "axios";
import { DataProvider } from "./store/DataContext";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <DataProvider>
      <Header />
      <DateCards />
      <Charts />
    </DataProvider>
  );
}

export default App;
