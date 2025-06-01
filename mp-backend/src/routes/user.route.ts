import {Router} from "express";
import {createUser, deleteUser, getUserById, listUser, updateUser} from "../controllers/user.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyToken,listUser);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken,createUser);
router.put("/:id", verifyToken,updateUser);
router.delete("/:id", verifyToken,deleteUser);

export default router;