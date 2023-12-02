import { Request, Response, Router } from "express";

import MessageController from "../Controllers/MessageController.js";
import MockMemberHandler from "../Interfaces/MemberHandlers/MockMemberHandler.js";
import MockMessageHandler from "../Interfaces/MessageHandlers/MockMessageHandler.js";

const router = Router();

router.get("/version-0/message", (req: Request, res: Response) => {
    const messageController = new MessageController(new MockMemberHandler(), new MockMessageHandler());
    messageController.getMessages(req, res);
});

export default router;
