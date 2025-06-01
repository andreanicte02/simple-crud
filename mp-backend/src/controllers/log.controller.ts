import { Request, Response } from "express";
import { pool } from "../db";
import {Log} from "../models/log.model";


export const listLog = async (_req: Request, res: Response): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT id_log, id_caso, id_fiscal, fecha, accion
      FROM Bitacora_Log
    `);
        res.json(result.recordset as Log[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const getLogById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        const result = await pool.request()
            .input("id_log", parseInt(id))
            .query(`
        SELECT id_log, id_caso, id_fiscal, fecha, accion
        FROM Bitacora_Log
        WHERE id_log = @id_log
      `);
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Log no encontrado" });
            return;
        }
        res.json(result.recordset[0] as Log);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const createLog = async (req: Request, res: Response): Promise<void> => {
    const { id_caso, id_fiscal, fecha, accion } = req.body as Omit<Log, "id_log">;
    try {
        await pool.connect();
        await pool.request()
            .input("id_caso", id_caso)
            .input("id_fiscal", id_fiscal)
            .input("fecha", fecha)
            .input("accion", accion)
            .query(`
        INSERT INTO Bitacora_Log (id_caso, id_fiscal, fecha, accion)
        VALUES (@id_caso, @id_fiscal, @fecha, @accion)
      `);
        res.json({ message: "Log creado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};
