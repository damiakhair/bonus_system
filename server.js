// BACKEND: server.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S3cur3P@ssw0rd!",
    database: "agrobank"
});

db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to database");
  });

app.get("/bonuses", (req, res) => {
    const year = req.query.year;
    db.query("SELECT * FROM bonuses WHERE year = ?", [year], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
