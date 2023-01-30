import connection from "../db/database.js";
import { Request, Response } from "express";
import {User, UserInstance} from "../protocols/user.protocols.js";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken";
import prisma from "../db/database.js";

export async function signUp(req: Request, res: Response): Promise<void> {
    const user: UserInstance = req.body;
    user.password = bcrypt.hashSync(user.password, 8);
    await prisma.users.create({
        data: {
            username: user.username,
            email: user.email,
            password: user.password
        }
    })
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response): Promise<void> {
    
    const user: UserInstance = req.body;
    
    const query = 
    await prisma.users.findFirst({
        where: {
            email: user.email
        }
    })
    
    const requiredUser: User = query;
    if(!requiredUser)
        res.sendStatus(404);
    else if(bcrypt.compareSync(user.password, requiredUser.password))
        res.send(jwt.sign({id: requiredUser.id}, "pocahontas"));
    else
        res.sendStatus(401);
        
}