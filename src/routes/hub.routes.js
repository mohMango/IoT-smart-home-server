import express from "express";

import { create } from "../controllers/hub.controller.js";
import {
  create as deviceCreate,
  updateValue,
} from "../controllers/device.controller.js";
import authHub from "../middleware/authHub.js";

const router = express.Router();

router.post("/", create);

// device routes
router.post("/:hubId/devices/create", authHub, deviceCreate);
router.put("/:hubId/devices/:deviceId/update", authHub, updateValue);

export default router;
