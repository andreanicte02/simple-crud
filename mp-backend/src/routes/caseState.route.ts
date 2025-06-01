import {Router} from "express";
import {
    createStateCase,
    deleteStateCase,
    getStateCaseById,
    listStatesCase,
    updateStateCase
} from "../controllers/caseState.controller";

const router = Router();

router.get("/", listStatesCase);
router.get("/:id", getStateCaseById);
router.post("/", createStateCase);
router.put("/:id", updateStateCase);
router.delete("/:id", deleteStateCase);

export default router;