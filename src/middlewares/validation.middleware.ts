import connection from "../db/database.js";
import {NextFunction, Request, Response} from "express";
import {QueryResult} from "pg";
import registerSchema from "../schemas/registerSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import reviewSchema from "../schemas/reviewSchema.js";
import animeSchema from "../schemas/animeSchema.js";
import prisma from "../db/database.js";

export async function validateSignUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    const { error } = registerSchema.validate(req.body);
    if(error) {
        res.status(422).send(error.message);
        return;
    }

    const users = 
    await prisma.users.findFirst({
        where: {
            email: req.body.email
        }
    })
    
    if(users)
        res.sendStatus(409);
    else 
        next();
}

export function validateSignIn(req: Request, res: Response, next: NextFunction): void {
    const { error } = loginSchema.validate(req.body);
    if(error) 
        res.status(422).send(error.message);
    else
        next();    
}

export function validateAnime(req: Request, res: Response, next: NextFunction): void {
    const { error } = animeSchema.validate(req.body);
    if(error)
        res.status(422).send(error.message);
    else
        next();    
}

export function validateUpdate(req: Request, res: Response, next: NextFunction): void {
    const status: string = req.body.status;
    if(!status || (status !== 'watched' && status !== 'not watched' && status !== 'watching'))
        res.status(422).send("invalid status");
    else
        next();    
}

export async function validateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error } = reviewSchema.validate(req.body);
    const id: number = Number(req.params.id);
    if(error)
        res.status(422).send(error.message);
    else { 
        const anime = await prisma.animes.findUnique({
            select: {
                user_id: true
            },
            where: {
                id: id
            }
        })
        if(anime.user_id !== res.locals.user)
            res.sendStatus(401);
        else
            next();    
    }
}
