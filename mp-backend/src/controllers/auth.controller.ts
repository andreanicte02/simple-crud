import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";


export const login = async (req: Request, res: Response) => {
    const { username, password_hash } = req.body; // <- OJO: debe ser 'password'
    try {
        const result = await pool.request()
            .input("username", username)
            .query("SELECT id_usuario, username, password_hash, id_fiscal FROM Usuario WHERE username = @username");
        if (result.recordset.length === 0) {
            res.status(401).json({ error: "Usuario no encontrado" });
            return;
        }
        const user = result.recordset[0];

        const valid = await bcrypt.compare(password_hash, user.password_hash);

        if (!valid) {
            res.status(401).json({ error: "Contraseña incorrecta" });
            return;
        }
        const token = jwt.sign(
            { id_usuario: user.id_usuario, username: user.username, id_fiscal: user.id_fiscal },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            token,
            user: {
                id_usuario: user.id_usuario,
                username: user.username,
                id_fiscal: user.id_fiscal,
            }
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};