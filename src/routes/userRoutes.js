import express from "express";
import { createUser, signIn, getAllUsers } from "../controllers/Users.js";

const router = express.Router();

router.post("/user", createUser);
router.post("/user/signin", signIn);
router.get("/user", getAllUsers);

export default router;
