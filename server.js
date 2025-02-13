// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'S3cur3P@ssw0rd!',
//     database: 'agrobank',
//     // port: 3306
// });

// // Connect to MySQL
// connection.connect((err) => {
//     if(err) {
//         console.error("Error connecting to MySQL:", err);
//         return;
//     }
//     console.log("Connected to MySQL as root!");
// });

// // Example Queery
// connection.query("SHOW TABLES", (err, results) => {
//     if (err) throw err;
//     console.log("Tables in agrobank:", results);
// });

// // Close connection when done (optional)
// connection.end();


// ----------------------------------------------------------------
const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Connect to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S3cureP@ssw0rd!",
    database: "agrobank"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL as root!");
});

// API to get tables
app.get("/tables", (req, res) => {
    connection.query("SHOW TABLES", (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json(results);
    });
});

// API to get data from a specific table
app.get("/data/:table", (req, res) => {
    const tableName = req.params.table;
    connection.query(`SELECT * FROM ${tableName}`, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});