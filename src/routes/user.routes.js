import express from "express";

import * as users from "../controllers/user.controller.js";
import { update, delete_, findAll } from "../controllers/hub.controller.js";
import {
  updateName,
  findAll as deviceFindAll,
} from "../controllers/device.controller.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/api/signup", users.signup);
router.post("/api/login/", users.login);
router.get("/api/:userId", auth, users.findOne);
router.put("/api/:userId", auth, users.update);
router.delete("/api/:userId", auth, users.delete_);

// hubs routes
router.put("/api/:userId/hubs/update", auth, update);
router.get("/api/:userId/hubs", auth, findAll);
router.delete("/api/:userId/hubs/:hubId", auth, delete_);

// devices routes
router.get("/api/:userId/devices", auth, deviceFindAll);
router.put("/api/:userId/devices/:deviceId/update", auth, updateName);

export default router;
