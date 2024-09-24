import express from "express";
import { getTeams } from "../controller/teamsController";

const router = express.Router();

router.get("/", getTeams);

export default router;
