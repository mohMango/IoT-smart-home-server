import sql from "./db.js";

const User = function (user) {
  this.id = user.id;
  this.email = user.email;
  this.password = user.password;
  this.name = user.name;
};

User.create = (newUser, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
      return;
    });

    connection.release();
    if (err) throw err;
  });
};

User.findById = (userId, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });

    connection.release();
    if (err) throw err;
  });
};

// User.getAll = (result) => {
//   sql.getConnection((err, connection) => {
//     if (err) throw err;

//     connection.query("SELECT * FROM users", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }

//       console.log("users: ", res);
//       result(null, res);
//     });
//     connection.release();
//     if (err) throw err;
//   });
// };

User.updateById = (id, user, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [user.name, user.email, user.password, user.id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRow == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
    connection.release();
    if (err) throw err;
  });
};

User.remove = (id, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("DELETE FROM users WHERE id = ? ", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
    });
    connection.release();
    if (err) throw err;
  });
};

export default User;
