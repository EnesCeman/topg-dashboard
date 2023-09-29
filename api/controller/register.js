const bcrypt = require("bcrypt");
const pool = require("../configs/pg_pool");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    const register_Client = await pool.connect();

    const data = await register_Client.query(
      `SELECT * FROM users WHERE email= $1;`,
      [email]
    );
    // register_Client.release(); // include it later
    const arr = data.rows;
    if (arr.length != 0) {
      return res
        .status(400)
        .json({ error: "Email already there, no need to register again." });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(err).json({ error: "Server error" });
        }
        const user = {
          name,
          email,
          phoneNumber,
          password: hash,
        };

        var flag = 1;

        register_Client.query(
          `INSERT INTO users (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
          [user.name, user.email, user.phoneNumber, user.password],
          (err) => {
            if (err) {
              flag = 0;
              console.error(err);
              return res.status(500).json({ error: "Database error" });
            } else {
              flag = 1;
              res.status(200).send({ message: "User added to database." });
            }
          }
        );
        register_Client.release();
        if (flag) {
          const token = jwt.sign(
            {
              email: user.email,
            },
            process.env.SECRET_KEY
          );
          res.status(200).cookie("token", token, { httpOnly: true });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Database error while registering user!" });
  }
};
