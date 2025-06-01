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
        await pool.close();
    }
};

export const getProsecutionOfficeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.connect();
        const result = await pool.request()
            .input("id_fiscalia", parseInt(id))
            .query(`
                SELECT id_fiscalia, nombre, ubicacion
                FROM Fiscalia
                WHERE id_fiscalia = @id_fiscalia
            `);
        if (result.recordset.length === 0) {
            res.status(404).json({ error: "Prosecution office not found" });
            return;
        }
        res.json(result.recordset[0] as ProsecutionOffice);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};
export const updateProsecutionOffice = async (req: Request, res: Response) => {
    const { nombre, ubicacion } = req.body;
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_fiscalia", parseInt(id))
            .input("nombre", nombre)
            .input("ubicacion", ubicacion)
            .query(`
        UPDATE Fiscalia
        SET nombre=@nombre, ubicacion=@ubicacion
        WHERE id_fiscalia=@id_fiscalia
      `);
        res.json({title:"Success", message: "Prosecution office updated" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const deleteProsecutionOffice = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.connect();
        await pool.request()
            .input("id_fiscalia", parseInt(id))
            .query(`DELETE FROM Fiscalia WHERE id_fiscalia=@id_fiscalia`);
        res.json({ title:"Success", message: "Prosecution office deleted" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        await pool.close();
    }
};

export const createProsecutionOffice = async (req: Request, res: Response) => {
    const { nombre, ubicacion } = req.body as Omit<ProsecutionOffice, "id_fiscalia">;
    try {
        await pool.connect();
        await pool.request()
            .input("nombre", nombre)
            .input("ubicacion", ubicacion)
            .query(`
        INSERT INTO Fiscalia (nombre, ubicacion)
        VALUES (@nombre, @ubicacion)
      `);
        res.json({ message: "Prosecution office created" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    } finally {
        pool.close();
    }
};