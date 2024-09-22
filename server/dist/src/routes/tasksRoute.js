"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const taskController_1 = require("../controller/taskController");
const router = express.Router();
router.get("/", taskController_1.getTasks);
router.post("/", taskController_1.createTask);
router.patch("/:taskId/status", taskController_1.updateStatus);
exports.default = router;
