import {Router} from "express";
import {listProsecutionOffices} from "../controllers/presecutionOffice.controller";

const router = Router();
router.get("/", listProsecutionOffices);

export default router;