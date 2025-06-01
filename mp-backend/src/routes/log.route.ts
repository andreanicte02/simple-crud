import {Router} from "express";
import {createLog, listLog} from "../controllers/log.controller";

const router = Router();

router.get("/", listLog);
router.post("/", createLog);

export default router;
