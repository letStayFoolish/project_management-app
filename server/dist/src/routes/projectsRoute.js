"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controller/projectController");
const router = express_1.default.Router();
router.get("/", projectController_1.getProjects);
router.post("/", projectController_1.createProject);
exports.default = router;
