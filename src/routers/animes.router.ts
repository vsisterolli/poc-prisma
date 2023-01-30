import { Router } from "express";
import validateUser from "../middlewares/validateUser.middleware.js";
import { validateAnime, validateUpdate } from "../middlewares/validation.middleware.js";
import { insertAnime, getUsersAnime, deleteAnime, updateAnimeStatus } from "../controllers/animes.controller.js";

const animesRouter: Router = Router();

animesRouter.get('/animes', validateUser, getUsersAnime);
animesRouter.post('/animes', validateUser, validateAnime, insertAnime);
animesRouter.patch('/animes/:id', validateUser, validateUpdate, updateAnimeStatus);
animesRouter.delete('/animes/:id', validateUser, deleteAnime);

export default animesRouter;