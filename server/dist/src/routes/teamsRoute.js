"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teamsController_1 = require("../controller/teamsController");
const router = express_1.default.Router();
router.get("/", teamsController_1.getTeams);
exports.default = router;
