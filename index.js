import express from "express";
import cors from "cors";
import morgan from "morgan";
import studentsRouter from "./router/students.js";
import authRouter from "./router/auth.js";
import { config } from './config.js';
import { initSocket } from "./connection/socket.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/students", studentsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

const server = app.listen(config.host.port);
initSocket(server);