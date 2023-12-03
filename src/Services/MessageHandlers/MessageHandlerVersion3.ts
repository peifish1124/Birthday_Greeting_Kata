import { Member } from "../../Models/Member.js";
import { BirthdayMessage, Message } from "../../Models/Message.js";

import IMessageHandler from "./IMessageHandler.js";

class MessageHandlerVersion3 implements IMessageHandler {
    generateMessage(member: Member): Message {
        const title = "Subject: Happy birthday!";

        let content = "";
        if (this.getMemberAge(member.birthday) > 49) {
            content = `Happy birthday, dear ${member.firstName}!\n(A greeting picture here)\n`;
        } else {
            content = `Happy birthday, dear ${member.firstName}!`;
        }
        return new BirthdayMessage(title, content);
    }

    getMemberAge(birthday: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear() - 1;

        if (today.getMonth() > birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate())) {
            age++;
        }

        return age;
    }
}

export default MessageHandlerVersion3;
