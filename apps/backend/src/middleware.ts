import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwksClient from 'jwks-rsa';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Initialize the JWKS client with your Clerk Issuer URL
const client = jwksClient({
  // This URL is standard for Clerk. It tells the client where to find the keys.
  jwksUri: `${process.env.CLERK_ISSUER_URL}/.well-known/jwks.json`
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err || !key) {
        callback(err || new Error("Key not found"));
        return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err.message);
                return res.status(401).json({ message: "Unauthorized" });
            }
            const payload = decoded as jwt.JwtPayload;
            console.log('Decoded token payload:', payload);
            if (payload?.sub) {
                req.userId = payload.sub;
                next();
            } else {
                res.status(401).json({ message: "Unauthorized: Invalid token payload" });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(401).json({ message: "Unauthorized" });
    }
}