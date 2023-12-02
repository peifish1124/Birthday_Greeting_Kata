import { LineMember, Member } from "../../Models/Member.js";

import IMemberHandler from "./IMemberHandler.js";

class MockMemberHandler implements IMemberHandler {
    getFilteredMembers(month: number | undefined, day: number | undefined, gender: string | undefined, age: number | undefined): Promise<Member[]> {
        return new Promise((resolve, reject) => {
            let filteredMembers = this.generateMembers();
            if (month) {
                filteredMembers = filteredMembers.filter((member) => member.birthday.getMonth() === month);
            }
            resolve(filteredMembers);
        });
    }

    generateMembers(): Member[] {
        return [
            new LineMember(1, "Robert", "Yen", "Male", new Date(1985, 8, 8), "robert.yen@linecorp.com"),
            new LineMember(2, "Cid", "Change", "Male", new Date(1990, 10, 10), "cid.change@linecorp.com"),
            new LineMember(3, "Miki", "Lai", "Female", new Date(1993, 4, 5), "miki.lai@linecorp.com"),
            new LineMember(4, "Sherry", "Chen", "Female", new Date(1993, 8, 8), "sherry.lai@linecorp.com"),
            new LineMember(5, "Peter", "Wang", "Male", new Date(1950, 12, 22), "peter.wang@linecorp.com"),
        ];
    }
}

export default MockMemberHandler;
