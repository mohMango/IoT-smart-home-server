import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// const db = mysql.createConnection({
//   host: "us-cdbr-east-03.cleardb.com",
//   user: "b3b5677df7ed24",
//   password: "d8983573",
//   database: "heroku_bfcd467c89387c7",
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("database connected...");
// });

//TODO move to routes dir
app.get("/", (req, res) => {
  res.send({ value: "Hello from server" });
});

app.listen(port, () => {
  console.log("on server");
});
