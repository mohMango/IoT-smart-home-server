import Device from "../models/device.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  const device = new Device({
    id: req.body.id,
    name: req.body.name,
    value: req.body.value,
    type: req.body.type,
    lastUpdate: new Date().toISOString().slice(0, 19).replace("T", " "),
    hubId: req.params.hubId,
  });

  Device.findById(device.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        Device.create(device, (err, data) => {
          if (err) res.status(500).send(err.message);
          else res.send(data);
        });
      } else {
        res.status(500).send({
          message: "Error retrieving device with id" + device.id,
        });
      }
    } else {
      res.send({ message: "found" });
    }
  });
};

export const findAll = (req, res) => {
  Device.getAll(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error eccorred while retrieving devices.",
      });
    else res.send(data);
  });
};

export const findOne_ = (req, res) => {
  Device.findById(req.params.deviceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Device with id ${req.params.deviceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving device with id" + req.params.deviceId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

export const findOne = (req, res) => {
  Device.findByUserId(req.params.userId, req.params.deviceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Device with id ${req.params.deviceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving device with id" + req.params.deviceId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

export const updateName = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not by empty" });
  }

  const newDevice = new Device({
    id: req.params.deviceId,
    name: req.body.name,
  });
  Device.updateName(req.params.userId, newDevice, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Device with id ${req.params.deviceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving device with id" + req.params.deviceId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

export const updateValue = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not by empty" });
  }

  const newDevice = new Device({
    id: req.params.deviceId,
    value: req.body.value,
    lastUpdate: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  Device.updateByValue(newDevice, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Device with id ${req.params.deviceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving device with id" + req.params.deviceId,
        });
      }
    } else {
      res.send(data);
    }
  });
};
