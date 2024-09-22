import express = require("express");
import {
  createTask,
  getTasks,
  updateStatus,
} from "../controller/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateStatus);

export default router;
