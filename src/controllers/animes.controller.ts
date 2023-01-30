import { Request, Response } from "express";
import { watch_status } from "@prisma/client"
import prisma from "../db/database.js";

export async function insertAnime(req: Request, res: Response): Promise<void> {
    const {name, image}: {name: string, image: string} = req.body;
    await prisma.users.update({
        where: {
            id: res.locals.user
        },
        data: { 
            animes: {
                create: {
                    name: name,
                    image: image
                }
            }
        }
    })
    res.sendStatus(201);
}

export async function getUsersAnime(req: Request, res: Response): Promise<void> {
    const animes = await
    prisma.animes.findMany({
        where: {
            user_id: res.locals.user
        }
    });
    res.send(animes);
}

export async function deleteAnime(req: Request, res: Response) {
    
    const animeId: string = req.params.id;
    
    const query = 
    await prisma.animes.findUnique({
        select: {
            user_id: true
        },
        where: {
            id: Number(animeId)
        }
    });

    const user_id: Number = query?.user_id;
    
    if(!user_id)
        return res.sendStatus(404);
    else if(user_id !== res.locals.user)
        return res.sendStatus(401);
    else await prisma.animes.delete({
        where: {
            id: Number(animeId)
        }
    }) 
    
    return res.sendStatus(200)
}

export async function updateAnimeStatus(req: Request, res: Response) {
    
    const animeId: string = req.params.id;
    const newStatus: watch_status = req.body.status;

    const query = 
    await prisma.animes.findUnique({
        select: {
            user_id: true
        },
        where: {
            id: Number(animeId)
        }
    })

    const user_id: Number = query?.user_id;
    
    console.log(user_id)
    if(!user_id)
        return res.sendStatus(404);
    else if(user_id !== res.locals.user)
        return res.sendStatus(401);
    else await prisma.animes.update({
        where: {
            id: Number(animeId)
        },
        data: {
            status: newStatus
        }
    }) 
    
    return res.sendStatus(200)
}