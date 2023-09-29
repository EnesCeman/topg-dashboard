const pool = require("../configs/pg_pool");

const jwt = require("jsonwebtoken");

exports.profile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY);
      const profile_Client = await pool.connect();

      const { rows } = await profile_Client.query(
        `SELECT * FROM users WHERE email=$1;`,
        [userData.email]
      );
      profile_Client.release();
      const user = rows[0];
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Authentication failed" });
    }
  } else {
    // Handle the case where there's no token (unauthenticated request)
    res.status(401).json({ error: "Unauthorized" });
  }
};
