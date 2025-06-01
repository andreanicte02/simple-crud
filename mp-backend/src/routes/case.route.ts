import {Router} from "express";
import {createCase, deleteCase, getCaseById, listCases, updateCase} from "../controllers/case.controller";

const router = Router();

router.get("/", listCases);
router.get("/:id", getCaseById);
router.post("/", createCase);
router.put("/:id", updateCase);
router.delete("/:id", deleteCase);

export default router;