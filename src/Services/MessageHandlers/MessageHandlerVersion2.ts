import { Member } from "../../Models/Member.js";
import { BirthdayMessage, Message } from "../../Models/Message.js";

import IMessageHandler from "./IMessageHandler.js";

class MessageHandlerVersion2 implements IMessageHandler {
    generateMessage(member: Member): Message {
        const title = "Subject: Happy birthday!";

        let content = '';
        if (member.gender === 'Male') {
            content = `Happy birthday, dear ${member.firstName}!\nWe offer special discount 20% off for the following items:\nWhite Wine, iPhone X`;
        } else if (member.gender === 'Female') {
            content = `Happy birthday, dear ${member.firstName}!\nWe offer special discount 50% off for the following items:\nCosmetic, LV Handbags`;
        } else {
            content = `Happy birthday, dear ${member.firstName}!`;
        }
        return new BirthdayMessage(title, content);
    }
}

export default MessageHandlerVersion2;
