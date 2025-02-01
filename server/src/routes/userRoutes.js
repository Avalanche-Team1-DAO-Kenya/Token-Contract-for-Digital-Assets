import express from "express";
import { signup } from "../services/userService.js";

const router = express.Router();

router.post("/signup", signup);

export default router;