import User from "../models/user.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  User.create(user, (err, data) => {
    if (err)
      res
        .status(500)
        .send(
          err.message || "Some error occurred while creating the Customer."
        );
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error eccorred while retrieving users.",
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id" + req.params.userId,
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

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id" + req.params.userId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

export const delete_ = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id" + req.params.userId,
        });
      }
    } else {
      res.send({ message: "user was deleted successflly!" });
    }
  });
};
