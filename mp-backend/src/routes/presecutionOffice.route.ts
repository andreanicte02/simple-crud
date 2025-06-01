import {Router} from "express";
import {
    createProsecutionOffice,
    deleteProsecutionOffice,
    getProsecutionOfficeById,
    listProsecutionOffices,
    updateProsecutionOffice
} from "../controllers/presecutionOffice.controller";

const router = Router();
router.get("/", listProsecutionOffices);
router.get("/:id", getProsecutionOfficeById);
router.post("/", createProsecutionOffice);
router.put("/:id", updateProsecutionOffice);
router.delete("/:id", deleteProsecutionOffice);

export default router;