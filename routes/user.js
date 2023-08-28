import express from "express";
import { User } from "../models/user.js";
import { getMyProfile,  login, logout, register,userAll } from "../controllers/user.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();
router.get("/all", userAll);
router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me",isAuthentication, getMyProfile);



export default router;