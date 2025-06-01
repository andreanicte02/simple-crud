import {Router} from "express";
import {
    createProsecutionOffice,
    deleteProsecutionOffice,
    getProsecutionOfficeById,
    listProsecutionOffices,
    updateProsecutionOffice
} from "../controllers/presecutionOffice.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();
router.get("/", verifyToken, listProsecutionOffices);
router.get("/:id", verifyToken,getProsecutionOfficeById);
router.post("/", verifyToken,createProsecutionOffice);
router.put("/:id", verifyToken, updateProsecutionOffice);
router.delete("/:id", verifyToken,deleteProsecutionOffice);

export default router;