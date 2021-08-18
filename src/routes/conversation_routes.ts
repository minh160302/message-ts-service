import { createConversation, getActiveConversations } from "../controller/conversations";
import express from "express"

const router = express.Router();

router.post("/", createConversation);
router.get("/type/:type", getActiveConversations)

export default router;