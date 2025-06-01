import { Router } from "express";
import {
    getListFiscal,
    getFiscalById,
    createFiscal,
    updateFiscal,
    deleteFiscal,
} from "../controllers/fiscal.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyToken,getListFiscal);
router.get("/:id", verifyToken,getFiscalById);
router.post("/",verifyToken, createFiscal);
router.put("/:id",verifyToken, updateFiscal);
router.delete("/:id",verifyToken, deleteFiscal);

export default router;