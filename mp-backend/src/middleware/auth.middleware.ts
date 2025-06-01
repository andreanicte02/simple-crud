import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({error: "Token requerido"});
        return;
    }

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
        res.status(401).json({error: "Token inválido"});
        return;
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        (req as any).user = payload;
        next();
    } catch {
        res.status(401).json({error: "Token inválido o expirado"});
        return;
    }
}