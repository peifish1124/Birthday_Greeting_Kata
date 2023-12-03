import { Request, Response, Router } from "express";

import MessageController from "../Controllers/MessageController.js";
import MockMemberHandler from "../Services/MemberHandlers/MockMemberHandler.js";
import MysqlMemberHandler from "../Services/MemberHandlers/MysqlMemberHandler.js";
import MessageHandlerVersion1 from "../Services/MessageHandlers/MessageHandlerVersion1.js";
import MessageHandlerVersion2 from "../Services/MessageHandlers/MessageHandlerVersion2.js";

const router = Router();

// for testing without database
router.get("/v0/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MockMemberHandler(), new MessageHandlerVersion1());
    messageController.getMessages(req, res);
});

// GET: /api/v1/messages?month=8&day=8
router.get("/v1/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MysqlMemberHandler(), new MessageHandlerVersion1());
    messageController.getMessages(req, res);
});

// GET: /api/v2/messages?month=8&day=8
router.get("/v2/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MysqlMemberHandler(), new MessageHandlerVersion2());
    messageController.getMessages(req, res);
});

export default router;
