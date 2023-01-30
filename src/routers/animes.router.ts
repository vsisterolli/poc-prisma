import { Router } from "express";
import validateUser from "../middlewares/validateUser.middleware.js";
import { validateAnime, validateReview, validateUpdate } from "../middlewares/validation.middleware.js";
import { insertAnime, getUsersAnime, deleteAnime, updateAnimeStatus, postReview, getReviews } from "../controllers/animes.controller.js";

const animesRouter: Router = Router();

animesRouter.get('/animes', validateUser, getUsersAnime);
animesRouter.post('/animes', validateUser, validateAnime, insertAnime);
animesRouter.patch('/animes/:id', validateUser, validateUpdate, updateAnimeStatus);
animesRouter.delete('/animes/:id', validateUser, deleteAnime);
animesRouter.post('/animes/:id/reviews', validateUser, validateReview, postReview)
animesRouter.get('/animes/reviews', validateUser, getReviews)

export default animesRouter;