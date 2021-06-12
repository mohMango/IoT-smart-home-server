import sql from "./db.js";

const Device = function (device) {
  this.id = device.id;
  this.name = device.name;
  this.value = device.value;
  this.type = device.type;
  this.lastUpdate = device.lastUpdate;
  this.hubId = device.hubId;
};

Device.create = (newDevice, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("INSERT INTO devices SET ?", newDevice, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created device: ", { id: res.insertId, ...newDevice });

      result(null, { id: res.insertId, ...newDevice });
    });

    connection.release();
    if (err) throw err;
  });
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

Device.findByUserId = (userId, deviceId, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      `SELECT devices.* , hubs.name, users.name
      FROM devices, hubs, users
      WHERE devices.id = ${deviceId}
      and users.id = ${userId} 
      and users.id = hubs.userId 
      and hubs.id = devices.hubId`,
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

Device.getAll = (userId, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      `SELECT devices.* , users.username
      FROM devices, hubs, users
      WHERE users.id = ${userId} 
      and users.id = hubs.userId 
      and hubs.id = devices.hubId`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("devices: ", res);
        result(null, res);
      }
    );
    connection.release();
    if (err) throw err;
  });
};

Device.updateName = (userId, device, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      `UPDATE devices
      JOIN hubs ON hubs.id = devices.hubId
      AND devices.id = ${device.id}
      JOIN users on  users.id = ${userId}
      AND users.id = hubs.userId
      SET devices.name = '${device.name}'`,
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

        console.log("updated device: ", { device });
        result(null, { device });
      }
    );
    connection.release();
    if (err) throw err;
  });
};

Device.updateByValue = (device, result) => {
  sql.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "UPDATE devices SET value = ?, lastUpdate = ? WHERE id = ?",
      [device.value, device.lastUpdate, device.id],
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

        console.log("updated device: ", { device });
        result(null, { device });
      }
    );
    connection.release();
    if (err) throw err;
  });
};

export default Device;
