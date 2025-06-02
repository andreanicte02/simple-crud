import { Request, Response } from "express";
import { pool } from "../db";
import {Case} from "../models/case.model";
import {CaseInfo} from "../models/caseInfo.model";

export const listCases = async (_req: Request, res: Response): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT id_caso, descripcion, fecha_creacion, id_estado, id_fiscal
      FROM Caso
    `);
        res.json(result.recordset as Case[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const getCaseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        const result = await pool.request()
            .input("id_caso", parseInt(id))
            .query(`
        SELECT id_caso, descripcion, fecha_creacion, id_estado, id_fiscal
        FROM Caso
        WHERE id_caso = @id_caso
      `);
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Caso no encontrado" });
            return;
        }
        res.json(result.recordset[0] as Case);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const createCase = async (req: Request, res: Response): Promise<void> => {
    const { descripcion, fecha_creacion, id_estado, id_fiscal, titulo , id_fiscalia} = req.body as Omit<Case, "id_caso">;
    try {
        await pool.connect();
        await pool.request()
            .input("descripcion", descripcion)
            .input("fecha_creacion", fecha_creacion) //la feecha siempre ba en el backend por el horario xd
            .input("id_estado", id_estado)
            .input("id_fiscal", id_fiscal)
            .input("titulo", titulo)
            .input("id_fiscalia", id_fiscalia)
            .query(`
        INSERT INTO Caso (descripcion, fecha_creacion, id_estado, id_fiscal, id_fiscalia, titulo)
        VALUES (@descripcion, @fecha_creacion, @id_estado, @id_fiscal, @id_fiscalia, @titulo)
      `);
        res.json({ message: "Caso creado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const updateCase = async (req: Request, res: Response): Promise<void> => {
    const { descripcion, fecha_creacion, id_estado, id_fiscal } = req.body;
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_caso", parseInt(id))
            .input("descripcion", descripcion)
            .input("fecha_creacion", fecha_creacion)
            .input("id_estado", id_estado)
            .input("id_fiscal", id_fiscal)
            .query(`
        UPDATE Caso
        SET descripcion = @descripcion, fecha_creacion = @fecha_creacion, id_estado = @id_estado, id_fiscal = @id_fiscal
        WHERE id_caso = @id_caso
      `);
        res.json({ message: "Caso actualizado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};


export const deleteCase = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_caso", parseInt(id))
            .query(`
        DELETE FROM Caso
        WHERE id_caso = @id_caso
      `);
        res.json({ message: "Caso eliminado" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};



export const listCasesInfo = async (_req: Request, res: Response): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.request().query(`
      SELECT 
        C.id_caso,
        C.titulo,
        C.descripcion,
        C.fecha_creacion,
        C.id_estado,
        E.nombre AS nombre_estado,
        C.id_fiscal,
        F.nombre AS nombre_fiscal,         -- Se agrega el nombre del fiscal
        C.id_fiscalia,
        FA.nombre AS nombre_fiscalia
      FROM Caso C
      JOIN Estado_Caso E ON C.id_estado = E.id_estado
      JOIN Fiscalia FA ON C.id_fiscalia = FA.id_fiscalia
      JOIN Fiscal F ON C.id_fiscal = F.id_fiscal
    `);
        res.json(result.recordset as CaseInfo[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};