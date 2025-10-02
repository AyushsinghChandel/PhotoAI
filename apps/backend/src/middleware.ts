import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export function authMiddleware(req: Request, res : Response, next: NextFunction){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    try{
    const decoded = jwt.decode(token!, { complete: false, json: true });
    console.log('Decoded token:', decoded);
    if(decoded?.sub){
    next();
    req.userId = decoded.sub;
    }
    }catch(e){
        res.status(400).json({message : "Unauthorized"});
    }

}