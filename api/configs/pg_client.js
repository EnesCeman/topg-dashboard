const pg = require("pg");
const { Client } = pg;

require("dotenv").config();

const client = new Client(JSON.parse(process.env.DB_URL));

module.exports = client;
