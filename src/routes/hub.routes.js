import express from "express";
import * as hubs from "../controllers/hub.controller.js";

const router = express.Router();

router.post("/hubs/", hubs.create);
router.get("/hubs/:hubId", hubs.findOne);
router.put("/hubs/:hubId", hubs.update);
router.delete("/hubs/:hubId", hubs.delete_);

export default router;
