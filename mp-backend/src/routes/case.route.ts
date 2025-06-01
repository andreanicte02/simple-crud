import {Router} from "express";
import {createCase, deleteCase, getCaseById, listCases, updateCase} from "../controllers/case.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/",verifyToken, listCases);
router.get("/:id",verifyToken, getCaseById);
router.post("/",verifyToken, createCase);
router.put("/:id",verifyToken, updateCase);
router.delete("/:id", verifyToken,deleteCase);

export default router;