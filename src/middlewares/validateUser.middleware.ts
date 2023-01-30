import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import DecodedJwt from "../protocols/decodedJwt.protocols.js";

export default async function validateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    // precisei usar any já que o authorization pode ser undefined!!
    let token = req.headers.authorization as string;
    if(!token) {
        res.sendStatus(403);
        return;
    }

    token = token.split('Bearer ')[1];
    if(!token) {
        res.sendStatus(403);
        return;
    }

    const decoded: DecodedJwt = jwt.verify(token, 'pocahontas');
    if(decoded.error) {
        res.sendStatus(401);
        return;
    }
    res.locals.user = decoded.id;

    next();
}
