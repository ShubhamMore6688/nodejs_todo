import express from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthentication, newTask);
router.get("/my", isAuthentication, getMyTasks);
router.route("/:id").put(isAuthentication,updateTask).delete(isAuthentication,deleteTask);

export default router;