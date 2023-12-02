import { Member } from "../../Models/Member.js";
import { BirthdayMessage, Message } from "../../Models/Message.js";

import IMessageHandler from "./IMessageHandler.js";

class MessageHandlerVersion1 implements IMessageHandler {
    generateMessage(member: Member): Message {
        const title = "Subject: Happy birthday!";
        const content = `Happy birthday, dear ${member.firstName}!`;
        return new BirthdayMessage(title, content);
    }
}

export default MessageHandlerVersion1;
