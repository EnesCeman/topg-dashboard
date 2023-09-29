const Pool = require("pg-pool");

require("dotenv").config();

const pool = new Pool({
  user: "data_user",
  host: "dpg-cka4d0ddrqvc73baugi0-a.oregon-postgres.render.com",
  database: "dataddo_test",
  password: "4LjOary9C6GCqaTB7axGX9nUznJd7g6Q",
  port: "5432",
  ssl: "true",
});

module.exports = pool;
