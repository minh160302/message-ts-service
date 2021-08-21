import { createConversation, getActiveConversations } from "../controller/conversations";
import express from "express"

const router = express.Router();

router.post("/", createConversation);
router.get("/user/:username/status/:status", getActiveConversations)

export default router;