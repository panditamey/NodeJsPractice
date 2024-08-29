import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
  console.log("hello");
  res.json({
    message: "hello",
  });
});

app.get("/getusers", async (req, res) => {
  const query = "SELECT * FROM practice.users";
  const users = await pool.query(query);
  res.json({
    totalUsers: users.rows.length,
    users: users.rows,
  });
});

app.post("/postuser", async (req, res) => {
  const data = await req.body;
  console.log(data);
  const query = `INSERT INTO practice.users (name,email,phone,password) VALUES ('${data.name}','${data.email}','${data.phone}','${data.password}') RETURNING *;`;
  console.log(query);
  const user = await pool.query(query);
  if (user.rowCount == 0) {
    res.json({
      message: "User Not Created",
    });
  } else {
    res.json({
      message: "User Created",
      user: user.rows,
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port port ${port}`);
});
