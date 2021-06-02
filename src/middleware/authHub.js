import Hub from "../models/hub.model.js";

const authHub = (req, res, next) => {
  Hub.findById(req.params.hubId, (err, data) => {
    if (err) {
      res.status(403).send({ message: "Error" });
    } else {
      if (req.body.password === data.password) {
        next();
      } else res.status(403).send({ message: "Not allow!" });
    }
  });
};

export default authHub;
