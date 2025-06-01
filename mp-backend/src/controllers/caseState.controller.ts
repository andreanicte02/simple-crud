import { Request, Response } from "express";
import { pool } from "../db";
import {StateCase} from "../models/caseState.model";


export const listStatesCase = async (_req: Request, res: Response): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT id_estado, nombre
      FROM Estado_Caso
    `);
        res.json(result.recordset as StateCase[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const getStateCaseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        const result = await pool.request()
            .input("id_estado", parseInt(id))
            .query(`
        SELECT id_estado, nombre
        FROM Estado_Caso
        WHERE id_estado = @id_estado
      `);
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Estado de caso no encontrado" });
            return;
        }
        res.json(result.recordset[0] as StateCase);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const createStateCase = async (req: Request, res: Response): Promise<void> => {
    const { nombre } = req.body as Omit<StateCase, "id_estado">;
    try {
        await pool.connect();
        await pool.request()
            .input("nombre", nombre)
            .query(`
        INSERT INTO Estado_Caso (nombre) VALUES (@nombre)
      `);
        res.json({ message: "Estado de caso creado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const updateStateCase = async (req: Request, res: Response): Promise<void> => {
    const { nombre } = req.body;
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_estado", parseInt(id))
            .input("nombre", nombre)
            .query(`
        UPDATE Estado_Caso
        SET nombre = @nombre
        WHERE id_estado = @id_estado
      `);
        res.json({ message: "Estado de caso actualizado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const deleteStateCase= async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_estado", parseInt(id))
            .query(`
        DELETE FROM Estado_Caso
        WHERE id_estado = @id_estado
      `);
        res.json({ message: "Estado de caso eliminado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};