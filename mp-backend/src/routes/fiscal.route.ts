import { Router } from "express";
import {
    getListFiscal,
    getFiscalById,
    createFiscal,
    updateFiscal,
    deleteFiscal, getFiscalByOffice,
} from "../controllers/fiscal.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyToken,getListFiscal);
router.get("/:id", verifyToken,getFiscalById);
router.post("/",verifyToken, createFiscal);
router.put("/:id",verifyToken, updateFiscal);
router.delete("/:id",verifyToken, deleteFiscal);
router.get("/office/:id_fiscalia",verifyToken, getFiscalByOffice);

export default router;