import { Member } from "../../Models/Member.js";

interface IMemberHandler {
  getFilteredMembers(month?: number, day?: number, gender?: string, age?: number): Member[];
}

export default IMemberHandler;
