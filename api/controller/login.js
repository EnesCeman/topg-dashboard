const bcrypt = require("bcrypt");
const pool = require("../configs/pg_pool");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const login_Client = await pool.connect();

    const data = await login_Client.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );
    login_Client.release();
    const user = data.rows;

    if (user?.length === 0) {
      res.status(400).json({
        error: "User is not registered, please register first",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {
          // Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );
          res.status(200).cookie("token", token, { httpOnly: true }).json(data);
        } else {
          // Declaring the errors
          if (result !== true) {
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", // Database connection error
    });
  }
};
