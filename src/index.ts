import express, { json } from "express";
import cors from "cors";
import usersRouter from "./routers/users.router.js";
import animesRouter from "./routers/animes.router.js";

const app = express();

app.use(cors());
app.use(json());
app.use(usersRouter);
app.use(animesRouter)

app.listen(4000);