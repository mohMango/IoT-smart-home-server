import Hub from "../models/hub.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  const hub = new Hub({
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
  });

  Hub.findById(hub.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        Hub.create(hub, (err, data) => {
          if (err) res.status(500).send(err.message);
          else res.send(data);
        });
      } else {
        res.status(500).send({
          message: "Error retrieving hub with id" + req.params.hubId,
        });
      }
    } else {
      res.send({ message: "found" });
    }
  });
};

export const findAll = (req, res) => {
  Hub.getAll(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error eccorred while retrieving hubs.",
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Hub.findById(req.params.hubId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Hub with id ${req.params.hubId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving hub with id" + req.params.hubId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

export const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not by empty" });
  }

  const hub = new Hub({
    id: req.body.id,
    name: req.body.name,
    userId: req.params.userId,
  });

  Hub.findById(hub.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Hub with id ${req.params.hubId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving hub with id" + req.params.hubId,
        });
      }
    } else {
      Hub.updateById(hub, (err, data) => {
        if (err) {
          res.status(500).send({
            message: "Error retrieving hub with id" + req.params.hubId,
          });
        } else {
          res.send(data);
        }
      });
    }
  });
};

export const delete_ = (req, res) => {
  Hub.remove(req.params.hubId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Hub with id ${req.params.hubId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving hub with id" + req.params.hubId,
        });
      }
    } else {
      res.send({ message: "hub was deleted successflly!" });
    }
  });
};
