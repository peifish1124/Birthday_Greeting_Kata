import { Request, Response, Router } from "express";

import MessageController from "../Controllers/MessageController.js";
import MockMemberHandler from "../Interfaces/MemberHandlers/MockMemberHandler.js";
import MockMessageHandler from "../Interfaces/MessageHandlers/MockMessageHandler.js";

const router = Router();

router.get("/version-1/message", (req: Request, res: Response) => {
    const mockMemberHandler = new MockMemberHandler();
    const mockMessageHandler = new MockMessageHandler();
    const messageController = new MessageController(mockMemberHandler, mockMessageHandler);
    messageController.getMessages(req, res);
});

export default router;
