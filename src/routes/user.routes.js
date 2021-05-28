import express from "express";
import * as users from "../controllers/user.controller.js";

const router = express.Router();

router.post("/users/", users.create);
router.get("/users/:userId", users.findOne);
router.put("/users/:userId", users.update);
router.delete("/users/:userId", users.delete_);

export default router;
