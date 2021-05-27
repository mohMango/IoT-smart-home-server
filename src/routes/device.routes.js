import express from "express";

import * as devices from "../controllers/device.controller.js";

const router = express.Router();

router.get("/devices/", devices.findAll);
router.get("/devices/:deviceId", devices.findOne);
router.put("/devices/:deviceId", devices.update);

export default router;
