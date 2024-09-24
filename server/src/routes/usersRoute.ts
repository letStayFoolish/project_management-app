import express from "express";
import { getUsers } from "../controller/usersController";

const router = express.Router();

router.get("/", getUsers);

export default router;
