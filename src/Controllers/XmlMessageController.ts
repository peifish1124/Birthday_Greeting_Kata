import { Request, Response } from "express";

import { Member } from "../Models/Member.js";
import { Message } from "../Models/Message.js";
import IMemberHandler from "../Services/MemberHandlers/IMemberHandler.js";
import IMessageHandler from "../Services/MessageHandlers/IMessageHandler.js";
import MessageController from "./MessageController.js";

import { create } from "xmlbuilder";

class XmlMessageController extends MessageController {
    constructor(memberHandler: IMemberHandler, messageHandler: IMessageHandler) {
        super(memberHandler, messageHandler);
    }

    public async getMessages(req: Request, res: Response): Promise<void> {
        const month: number | undefined = req.query.month ? Number(req.query.month) : undefined;
        const day: number | undefined = req.query.day ? Number(req.query.day) : undefined;
        
        const selectedMembers: Member[] = await this._memberHandler.getFilteredMembers(month, day);
        const messages: Message[] = selectedMembers.map((member) => this._messageHandler.generateMessage(member));

        if (messages.length > 0) {
            const xmlString = this.convertMessagesToXml(messages);
            res.set('Content-Type', 'text/xml');
            res.status(200);
            res.send(xmlString);
        } else {
            const xmlString = this.convertMessagesToXml(messages);
            res.set('Content-Type', 'text/xml');
            res.status(404);
            res.send(xmlString);
        }
    }

    private convertMessagesToXml(messages: Message[]): string {
      const root = create('root');

      messages.forEach((message) => {
          root.ele('title', message.title);
          root.ele('content', message.content);
      });

      return root.end({ indent: '    ', newline: '\n' });
    }
}

export default XmlMessageController;
