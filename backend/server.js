const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "WPS Portal API is running" });
});

app.post("/api/simulation", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }

  const sql = `
    INSERT INTO simulation_users
    (name, simulation_attempt)
    VALUES (?, ?)
  `;

  db.query(sql, [name, true], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Simulation recorded"
    });
  });
});

app.listen(5000, () => {
  console.log("WPS Portal backend running on port 5000");
});
