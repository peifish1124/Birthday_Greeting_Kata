import { Request, Response } from "express";

import IMemberHandler from "../Interfaces/MemberHandlers/IMemberHandler.js";
import IMessageHandler from "../Interfaces/MessageHandlers/IMessageHandler.js";
import { Member } from "../Models/Member.js";
import { Message } from "../Models/Message.js";

class MessageController {
    private readonly _memberHandler: IMemberHandler;
    private readonly _messageHandler: IMessageHandler;

    constructor(memberHandler: IMemberHandler, messageHandler: IMessageHandler) {
        this._memberHandler = memberHandler;
        this._messageHandler = messageHandler;
    }

    public getMessages(req: Request, res: Response): void {
        const month: number | undefined = req.query.month ? Number(req.query.month) : undefined;
        const day: number | undefined = req.query.day ? Number(req.query.day) : undefined;
        const gender: string | undefined = req.query.gender ? String(req.query.gender) : undefined;
        const age: number | undefined = req.query.age ? Number(req.query.age) : undefined;

        const selectedMembers: Member[] = this._memberHandler.getFilteredMembers(month, day, gender, age);
        const messages: Message[] = selectedMembers.map((member) => this._messageHandler.generateMessage(member));

        if (messages.length > 0) {
            res.status(200).json(messages);
        } else {
            res.status(404).json(messages);
        }
    }
}

export default MessageController;
