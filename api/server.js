const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { BigQuery } = require("@google-cloud/bigquery");
const { login } = require("./controller/login");
const { profile } = require("./controller/profile");
const { register } = require("./controller/register");

require("dotenv").config();

let keyFileContent = process.env.GOOGLE_KEY_FILE_JSON;
keyFileContent = JSON.parse(keyFileContent);

const bigquery = new BigQuery({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: keyFileContent,
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: [
      "https://topg-dashboard.onrender.com",
      "https://topg-dashboard.vercel.app",
      "http://localhost:5173",
    ],
  })
);

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

app.post("/api/bigquery", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const table = process.env.BIGQUERY_TABLE_NAME;

    const query = `
    SELECT 
    activeusers, 
    totalrevenue, 
    averagesessionduration, 
    screenpageviews 
    FROM ${table} 
    WHERE formatted_date between'${startDate}' and '${endDate}'`;
    const options = {
      query,
    };

    const [rows] = await bigquery.query(options);

    res.json(rows);
  } catch (e) {
    console.error("errrrrrr");
  }
});

app.post("/api/activebybrowser", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const table = process.env.BIGQUERY_TABLE_NAME;

    const query = `
    SELECT 
    sum(activeusers) as activeusers, 
    browser 
    FROM ${table} 
    WHERE formatted_date between'${startDate}' and '${endDate}'
    group by browser`;
    const options = {
      query,
    };

    const [rows] = await bigquery.query(options);

    res.json(rows);
  } catch (e) {
    console.error("errrrrrr");
  }
});

app.post("/api/login", login);
app.post("/api/register", register);

app.get("/api/profile", profile);

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
