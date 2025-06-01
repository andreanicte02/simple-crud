import {pool} from "../db";
import { Fiscal } from "../models/fiscal.model";
import {Request, Response} from "express";


export const getListFiscal = async (_req: Request, res: Response): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT id_fiscal, nombre, correo, id_fiscalia
      FROM Fiscal
    `);
        res.json(result.recordset as Fiscal[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const getFiscalById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        const result = await pool.request()
            .input("id_fiscal", parseInt(id))
            .query(`
        SELECT id_fiscal, nombre, correo, id_fiscalia
        FROM Fiscal
        WHERE id_fiscal = @id_fiscal
      `);
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Fiscal no encontrado" });
            return;
        }
        res.json(result.recordset[0] as Fiscal);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const createFiscal = async (req: Request, res: Response): Promise<void> => {
    const { nombre, correo, id_fiscalia } = req.body as Omit<Fiscal, "id_fiscal">;
    try {
        await pool.connect();
        await pool.request()
            .input("nombre", nombre)
            .input("correo", correo)
            .input("id_fiscalia", id_fiscalia)
            .query(`
        INSERT INTO Fiscal (nombre, correo, id_fiscalia)
        VALUES (@nombre, @correo, @id_fiscalia)
      `);
        res.json({ message: "Fiscal creado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

// Actualizar fiscal
export const updateFiscal = async (req: Request, res: Response): Promise<void> => {
    const { nombre, correo, id_fiscalia } = req.body;
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_fiscal", parseInt(id))
            .input("nombre", nombre)
            .input("correo", correo)
            .input("id_fiscalia", id_fiscalia)
            .query(`
        UPDATE Fiscal
        SET nombre = @nombre, correo = @correo, id_fiscalia = @id_fiscalia
        WHERE id_fiscal = @id_fiscal
      `);
        res.json({ message: "Fiscal actualizado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const deleteFiscal = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_fiscal", parseInt(id))
            .query(`
        DELETE FROM Fiscal
        WHERE id_fiscal = @id_fiscal
      `);
        res.json({ message: "Fiscal eliminado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};