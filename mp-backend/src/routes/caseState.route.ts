import {Router} from "express";
import {
    createStateCase,
    deleteStateCase,
    getStateCaseById,
    listStatesCase,
    updateStateCase
} from "../controllers/caseState.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyToken,listStatesCase);
router.get("/:id", verifyToken,getStateCaseById);
router.post("/", verifyToken,createStateCase);
router.put("/:id", verifyToken,updateStateCase);
router.delete("/:id", verifyToken,deleteStateCase);

export default router;