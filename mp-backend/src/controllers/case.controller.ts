import { Request, Response } from "express";
import { pool } from "../db";
import {Case, ReportByUser} from "../models/case.model";
import {CaseInfo} from "../models/caseInfo.model";

export const listCases = async (_req: Request, res: Response): Promise<void> => {
    try {
        
        const result = await pool.request().query(`
      SELECT id_caso, descripcion, fecha_creacion, id_estado, id_fiscal
      FROM Caso
    `);
        res.json(result.recordset as Case[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};

export const getCaseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        
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
        console.log('Error')
    }
};

export const createCase = async (req: Request, res: Response): Promise<void> => {
    const { descripcion, fecha_creacion, id_estado, id_fiscal, titulo , id_fiscalia} = req.body as Omit<Case, "id_caso">;
    try {
        
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
        console.log('Error')
    }
};

const ESTADO_PENDIENTE = 1;

export const updateCase = async (req: Request, res: Response): Promise<void> => {
    const { descripcion, id_estado, id_fiscal, titulo, id_fiscalia } = req.body;
    const { id } = req.params;

    try {
        // 1. Obtén los datos actuales del caso
        const casoResult = await pool.request()
            .input("id_caso", parseInt(id))
            .query(`
                SELECT id_estado, id_fiscal, id_fiscalia
                FROM Caso
                WHERE id_caso = @id_caso
            `);

        if (casoResult.recordset.length === 0) {
            res.status(404).json({ error: "Caso no encontrado" });
            return;
        }

        const casoActual = casoResult.recordset[0];

        if (casoActual.id_estado !== ESTADO_PENDIENTE) {
            await pool.request()
                .input("id_caso", parseInt(id))
                .input("id_fiscal_anterior", casoActual.id_fiscal)
                .input("id_fiscal_nuevo", id_fiscal)
                .input("motivo", "Reasignación fallida: El estado del caso no es pendiente.")
                .query(`
                    INSERT INTO Bitacora_Log (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
                    VALUES (@id_caso, @id_fiscal_anterior, @id_fiscal_nuevo, @motivo)
                `);
            res.status(400).json({ error: "Solo se puede reasignar si el caso está en estado pendiente." });
            return;
        }

        const fiscalResult = await pool.request()
            .input("id_fiscal", id_fiscal)
            .query("SELECT id_fiscalia FROM Fiscal WHERE id_fiscal = @id_fiscal");
        if (fiscalResult.recordset.length === 0) {
            res.status(404).json({ error: "Nuevo fiscal no encontrado" });
            return;
        }

        const fiscaliaNueva = fiscalResult.recordset[0].id_fiscalia;
        if (fiscaliaNueva !== casoActual.id_fiscalia) {
            await pool.request()
                .input("id_caso", parseInt(id))
                .input("id_fiscal_anterior", casoActual.id_fiscal)
                .input("id_fiscal_nuevo", id_fiscal)
                .input("motivo", "Reasignación fallida: El nuevo fiscal no pertenece a la misma fiscalía.")
                .query(`
                    INSERT INTO Bitacora_Log (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
                    VALUES (@id_caso, @id_fiscal_anterior, @id_fiscal_nuevo, @motivo)
                `);
            res.status(400).json({ error: "El nuevo fiscal debe pertenecer a la misma fiscalía." });
            return;
        }

        await pool.request()
            .input("id_caso", parseInt(id))
            .input("descripcion", descripcion)
            .input("id_estado", id_estado)
            .input("id_fiscal", id_fiscal)
            .input("titulo", titulo)
            .input("id_fiscalia", id_fiscalia)
            .query(`
                UPDATE Caso
                SET descripcion = @descripcion, id_estado = @id_estado, id_fiscal = @id_fiscal, titulo = @titulo, id_fiscalia = @id_fiscalia
                WHERE id_caso = @id_caso
            `);

        res.json({ message: "Caso actualizado correctamente." });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCase = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        
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
        console.log('Error')
    }
};



export const listCasesInfo = async (_req: Request, res: Response): Promise<void> => {
    try {
        
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
        console.log('Error')
    }
};

export const getCasesCountByStateForUser = async (req: Request, res: Response): Promise<void> => {
    const { id_usuario } = req.params;
    try {
        

        const fiscalResult = await pool.request()
            .input("id_usuario", parseInt(id_usuario))
            .query("SELECT id_fiscal FROM Usuario WHERE id_usuario = @id_usuario");

        if (fiscalResult.recordset.length === 0) {
            res.status(404).json({ error: "Usuario no encontrado o no tiene fiscal asociado" });
            return;
        }
        const id_fiscal = fiscalResult.recordset[0].id_fiscal;


        const casesResult = await pool.request()
            .input("id_fiscal", id_fiscal)
            .query(`
                SELECT 
                    C.id_estado,
                    E.nombre AS nombre_estado,
                    COUNT(*) AS cantidad
                FROM Caso C
                JOIN Estado_Caso E ON C.id_estado = E.id_estado
                WHERE C.id_fiscal = @id_fiscal
                GROUP BY C.id_estado, E.nombre
                ORDER BY cantidad DESC
            `);

        res.json(casesResult.recordset as ReportByUser[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        console.log('Error')
    }
};