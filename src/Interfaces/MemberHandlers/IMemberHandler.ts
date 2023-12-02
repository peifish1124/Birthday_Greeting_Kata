import { Member } from "../../Models/Member.js";

interface IMemberHandler {
  getFilteredMembers(month?: number, day?: number, gender?: string, age?: number): Promise<Member[]>;
}

export default IMemberHandler;
