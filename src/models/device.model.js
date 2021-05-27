import sql from "./db.js";

const Device = function (device) {
  this.id = device.id;
  this.name = device.name;
  this.value = device.value;
  this.type = device.type;
};

Device.findById = (deviceId, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      `SELECT * FROM devices WHERE id = ${deviceId}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found device: ", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );

    connection.release();
    if (err) throw err;
  });
};

Device.getAll = (result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("SELECT * FROM devices", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("devices: ", res);
      return result(null, res);
    });
    connection.release();
    if (err) throw err;
  });
};

Device.updateById = (id, device, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "UPDATE devices SET name = ?, value = ?, type = ? WHERE id = ?",
      [device.name, device.value, device.type, device.id],
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

        console.log("updated device: ", { id: id, ...device });
        result(null, { id: id, ...device });
      }
    );
    connection.release();
    if (err) throw err;
  });
};

export default Device;
