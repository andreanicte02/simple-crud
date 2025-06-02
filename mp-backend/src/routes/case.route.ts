import {Router} from "express";
import {
    createCase,
    deleteCase,
    getCaseById, getCasesCountByStateForUser,
    listCases,
    listCasesInfo,
    updateCase
} from "../controllers/case.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/info", verifyToken,listCasesInfo);
router.get("/",verifyToken, listCases);
router.get("/:id",verifyToken, getCaseById);
router.post("/",verifyToken, createCase);
router.put("/:id",verifyToken, updateCase);
router.delete("/:id", verifyToken,deleteCase);
router.get("/list/:id_usuario", getCasesCountByStateForUser);
export default router;