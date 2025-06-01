import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        await pool.connect();
        const result = await pool.request()
            .input("username", username)
            .query("SELECT id_usuario, username, password FROM Usuario WHERE username = @username");
        if (result.recordset.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

        const user = result.recordset[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });
        const token = jwt.sign({ id: user.id_usuario, username: user.username }, JWT_SECRET, { expiresIn: "8h" });
        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};