import express from "express";
import { jwtMiddleware } from "../middlewares/authentication.js";
import {
  associatePlayer,
  createTeam,
  getAllTeams,
} from "../controllers/Teams.js";

const router = express.Router();

router.get("/team", jwtMiddleware, getAllTeams);
router.post("/team", jwtMiddleware, createTeam);
router.put("/team/:teamId", jwtMiddleware, associatePlayer);

export default router;
