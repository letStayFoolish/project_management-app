"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
/* ROUTE IMPORTS */
const projectsRoute_1 = __importDefault(require("./routes/projectsRoute"));
const tasksRoute_1 = __importDefault(require("./routes/tasksRoute"));
const searchRoute_1 = __importDefault(require("./routes/searchRoute"));
const teamsRoute_1 = __importDefault(require("./routes/teamsRoute"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* ROUTES */
app.get("/", (req, res) => {
    res.send("This is home route.");
});
app.use("/projects", projectsRoute_1.default);
app.use("/tasks", tasksRoute_1.default);
app.use("/search", searchRoute_1.default);
app.use("/teams", teamsRoute_1.default);
app.use("/users", usersRoute_1.default);
/* SERVER */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
