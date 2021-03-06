import sql from "./db.js";

const Hub = function (hub) {
  this.id = hub.id;
  this.name = hub.name;
  this.password = hub.password;
  this.userId = hub.userId;
};

Hub.create = (newHub, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("INSERT INTO hubs SET ?", newHub, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created hub: ", { id: res.insertId, ...newHub });
      result(null, { id: res.insertId, ...newHub });
      return;
    });

    connection.release();
    if (err) throw err;
  });
};

Hub.findById = (hubId, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(`SELECT * FROM hubs WHERE id = ${hubId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found hub: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });

    connection.release();
    if (err) throw err;
  });
};

Hub.getAll = (userId, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "SELECT * FROM hubs WHERE userId = ?",
      userId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("hubs: ", res);
        result(null, res);
      }
    );
    connection.release();
    if (err) throw err;
  });
};

Hub.updateById = (hub, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "UPDATE hubs SET name = ? ,userId = ? WHERE id = ?",
      [hub.name, hub.userId, hub.id],
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

        console.log("updated hub: ", { hub });
        result(null, { hub });
      }
    );
    connection.release();
    if (err) throw err;
  });
};

Hub.remove = (id, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("DELETE FROM hubs WHERE id = ? ", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted hub with id: ", id);
      result(null, res);
    });
    connection.release();
    if (err) throw err;
  });
};

export default Hub;
