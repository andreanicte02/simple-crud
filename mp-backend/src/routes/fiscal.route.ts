import { Router } from "express";
import {
    getListFiscal,
    getFiscalById,
    createFiscal,
    updateFiscal,
    deleteFiscal,
} from "../controllers/fiscal.controller";

const router = Router();

router.get("/", getListFiscal);
router.get("/:id", getFiscalById);
router.post("/", createFiscal);
router.put("/:id", updateFiscal);
router.delete("/:id", deleteFiscal);

export default router;