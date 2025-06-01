import {Router} from "express";
import {createLog, listLog} from "../controllers/log.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyToken,listLog);
router.post("/", verifyToken,createLog);

export default router;
