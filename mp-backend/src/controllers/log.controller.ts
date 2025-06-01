import { Request, Response } from "express";
import { pool } from "../db";
import {Log} from "../models/log.model";


export const listLog = async (_req: Request, res: Response): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT id_log, id_caso, id_fiscal_anterior, id_fiscal_nuevo, fecha_intento, motivo
      FROM Bitacora_Log
    `);
        res.json(result.recordset as Log[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const createLog = async (req: Request, res: Response): Promise<void> => {
    const { id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo } = req.body as Omit<Log, "id_log" | "fecha_intento">;
    try {
        await pool.connect();
        await pool.request()
            .input("id_caso", id_caso)
            .input("id_fiscal_anterior", id_fiscal_anterior)
            .input("id_fiscal_nuevo", id_fiscal_nuevo)
            .input("motivo", motivo)
            .query(`
        INSERT INTO Bitacora_Log (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
        VALUES (@id_caso, @id_fiscal_anterior, @id_fiscal_nuevo, @motivo)
      `);
        res.json({ message: "Log creado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};