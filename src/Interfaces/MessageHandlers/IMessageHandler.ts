import { Member } from "../../Models/Member.js";
import { Message } from "../../Models/Message.js";

interface IMessageHandler {
  generateMessage(member: Member): Message;
}

export default IMessageHandler;
