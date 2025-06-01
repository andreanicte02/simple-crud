import {Request, Response} from "express";
import {ProsecutionOffice} from "../models/presectuionOffice.model";
import {pool} from "../db";

export const listProsecutionOffices = async (req: Request, res: Response) => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT id_fiscalia, nombre, ubicacion
      FROM Fiscalia
    `);
        res.json(result.recordset as ProsecutionOffice[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        pool.close();
    }
};