import mysql from "mysql";
import dbConfig from "../config/db.config.js";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
});

// pool.getConnection((error) => {
//   if (error) {
//     console.log(error.code);
//   }
//   console.log("Successfully connected to the database.");
// });

export default pool;
