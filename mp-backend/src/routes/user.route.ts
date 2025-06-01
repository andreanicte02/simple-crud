import {Router} from "express";
import {createUser, deleteUser, getUserById, listUser, updateUser} from "../controllers/user.controller";

const router = Router();

router.get("/", listUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;