import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

export const login = async (req: Request, res: Response) => {
    const { username, password_hash } = req.body;
    try {
        const result = await pool.request()
            .input("username", username)
            .query(`
                SELECT 
                  U.id_usuario,
                  U.username,
                  U.password_hash,
                  U.id_fiscal,
                  F.id_fiscalia,
                  FA.nombre AS nombre_fiscalia,
                  F.nombre AS nombre_fiscal,
                  U.rol
                FROM Usuario U
                JOIN Fiscal F ON U.id_fiscal = F.id_fiscal
                JOIN Fiscalia FA ON F.id_fiscalia = FA.id_fiscalia
                WHERE U.username = @username
            `);

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
            {
                id_usuario: user.id_usuario,
                username: user.username,
                id_fiscal: user.id_fiscal,
                id_fiscalia: user.id_fiscalia,
                rol: user.rol
            },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            token,
            user: {
                id_usuario: user.id_usuario,
                username: user.username,
                id_fiscal: user.id_fiscal,
                id_fiscalia: user.id_fiscalia,
                nombre_fiscal: user.nombre_fiscal,
                nombre_fiscalia: user.nombre_fiscalia,
                rol: user.rol
            }
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};