import { Request, Response, Router } from "express";

import MessageController from "../Controllers/MessageController.js";
import MockMemberHandler from "../Services/MemberHandlers/MockMemberHandler.js";
import MongodbMemberHandler from "../Services/MemberHandlers/MongodbMemberHandler.js";
import MessageHandlerVersion1 from "../Services/MessageHandlers/MessageHandlerVersion1.js";
import MessageHandlerVersion2 from "../Services/MessageHandlers/MessageHandlerVersion2.js";
import MessageHandlerVersion3 from "../Services/MessageHandlers/MessageHandlerVersion3.js";
import MessageHandlerVersion4 from "../Services/MessageHandlers/MessageHandlerVersion4.js";

const router = Router();

// for testing without database
router.get("/v0/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MockMemberHandler(), new MessageHandlerVersion1());
    messageController.getMessages(req, res);
});

// GET: /api/v1/messages?month=8&day=8
router.get("/v1/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MongodbMemberHandler(), new MessageHandlerVersion1());
    messageController.getMessages(req, res);
});

// GET: /api/v2/messages?month=8&day=8
router.get("/v2/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MongodbMemberHandler(), new MessageHandlerVersion2());
    messageController.getMessages(req, res);
});

// GET: /api/v3/messages?month=12&day=22
router.get("/v3/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MongodbMemberHandler(), new MessageHandlerVersion3());
    messageController.getMessages(req, res);
});

// GET: /api/v4/messages?month=8&day=8
router.get("/v4/messages", (req: Request, res: Response) => {
    const messageController = new MessageController(new MongodbMemberHandler(), new MessageHandlerVersion4());
    messageController.getMessages(req, res);
});

export default router;
