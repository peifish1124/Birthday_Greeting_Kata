import { Request, Response, Router } from "express";

import MessageController from "../Controllers/MessageController.js";
import MockMemberHandler from "../Interfaces/MemberHandlers/MockMemberHandler.js";
import MessageHandlerVersion1 from "../Interfaces/MessageHandlers/MessageHandlerVersion1.js";

import MysqlMemberHandler from "../Interfaces/MemberHandlers/MysqlMemberHandler.js";

const router = Router();

// for testing without database
router.get("/version-0/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MockMemberHandler(), new MessageHandlerVersion1());
    messageController.getMessages(req, res);
});

// GET: /api/version-1/messages?month=8&day=8
router.get("/version-1/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MysqlMemberHandler(), new MessageHandlerVersion1());
    messageController.getMessages(req, res);
});

export default router;
