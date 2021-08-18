import { findUserByUsername } from "../controller/user"
import express from "express"

const router = express.Router();

router.get("/:id", findUserByUsername);

export default router