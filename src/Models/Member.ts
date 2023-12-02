export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  email: string;
}

export class LineMember implements Member {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: Date;
    email: string;

    constructor(id: number, firstName: string, lastName: string, gender: string, birthday: Date, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthday = birthday;
        this.email = email;
    }
}
