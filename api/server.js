const express = require("express");
const cors = require("cors");
const { BigQuery } = require("@google-cloud/bigquery");

require("dotenv").config();

const bigquery = new BigQuery({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEYFILE_PATH,
});

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/bigquery", async (req, res) => {
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

app.post("/activebybrowser", async (req, res) => {
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

app.listen(4000);
