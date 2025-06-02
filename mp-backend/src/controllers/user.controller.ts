import { Request, Response } from "express";
import { pool } from "../db";
import {User} from "../models/user.model";

export const listUser = async (_req: Request, res: Response): Promise<void> => {
    try {
        
        const result = await pool.request().query(`
      SELECT id_usuario, username, password_hash, id_fiscal
      FROM Usuario
    `);
        res.json(result.recordset as User[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        
        const result = await pool.request()
            .input("id_usuario", parseInt(id))
            .query(`
        SELECT id_usuario, username, password_hash, id_fiscal
        FROM Usuario
        WHERE id_usuario = @id_usuario
      `);
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.json(result.recordset[0] as User);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password_hash, id_fiscal } = req.body as Omit<User, "id_usuario">;
    try {
        
        await pool.request()
            .input("username", username)
            .input("password_hash", password_hash)
            .input("id_fiscal", id_fiscal)
            .query(`
        INSERT INTO Usuario (username, password_hash, id_fiscal)
        VALUES (@username, @password_hash, @id_fiscal)
      `);
        res.json({ message: "Usuario creado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password_hash, id_fiscal } = req.body;
    const { id } = req.params;
    try {
        
        await pool.request()
            .input("id_usuario", parseInt(id))
            .input("username", username)
            .input("password_hash", password_hash)
            .input("id_fiscal", id_fiscal)
            .query(`
        UPDATE Usuario
        SET username = @username, password_hash = @password_hash, id_fiscal = @id_fiscal
        WHERE id_usuario = @id_usuario
      `);
        res.json({ message: "Usuario actualizado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        
        await pool.request()
            .input("id_usuario", parseInt(id))
            .query(`
        DELETE FROM Usuario
        WHERE id_usuario = @id_usuario
      `);
        res.json({ message: "Usuario eliminado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};