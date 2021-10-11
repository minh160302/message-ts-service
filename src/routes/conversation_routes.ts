import { createConversation, getActiveConversations, getConversationById } from "../controller/conversations";
import express from "express"

const router = express.Router();

router.post("/", createConversation);
router.get("/user/:username/status/:status", getActiveConversations)
router.get("/:id", getConversationById)

export default router;