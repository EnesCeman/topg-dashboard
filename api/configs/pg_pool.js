const Pool = require("pg-pool");

require("dotenv").config();

const pool = new Pool(JSON.parse(process.env.POOL_CONNECTION));

module.exports = pool;
