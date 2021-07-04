import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  User.findBy("email", req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        User.create(user, (err, data) => {
          if (err) res.status(500).send(err.message);
          else {
            const token = jwt.sign(
              { email: user.email, username: user.username },
              "test",
              { expiresIn: "1h" }
            );
            res.send({ ...data, token: token });
          }
        });
      }
    } else {
      res.status(409).send({ message: "User already exists" });
    }
  });
};

export const login = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  User.findBy("email", req.body.email, (err, data) => {
    if (err) {
      res.status(404).send({ message: "Email or password not correct" });
    } else {
      if (data.password !== req.body.password)
        res.status(404).send({ message: "Email or password not correct" });

      const token = jwt.sign(
        { email: data.email, username: data.username },
        "test",
        { expiresIn: "1h" }
      );
      res.send({ ...data, token: token });
    }
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
  User.findBy("id", req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
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

  User.updateById(params.userId, new User(req.body), (err, data) => {
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
