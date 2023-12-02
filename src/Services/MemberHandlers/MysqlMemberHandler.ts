import mysql from "mysql";

import { Member } from "../../Models/Member.js";

import IMemberHandler from "./IMemberHandler.js";


class MysqlMemberHandler implements IMemberHandler {
    private connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }

    getFilteredMembers(month: number | undefined, day: number | undefined, gender: string | undefined, age: number | undefined): Promise<Member[]> {
        const filteredMembers: Member[] = [];
        let query = "SELECT * FROM members WHERE 1";
        const queryParams: any[] = [];

        if (month) {
            query += " AND MONTH(date_of_birth) = ? ";
            queryParams.push(month);
        }
        if (day) {
            query += " AND DAY(date_of_birth) = ? ";
            queryParams.push(day);
        }

        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.connection.query(query, queryParams, (queryErr, results) => {
                    if (queryErr) {
                        reject(queryErr);
                        return;
                    }

                    results.forEach((row: any) => {
                        const member: Member = {
                            id: row.id,
                            firstName: row.first_name,
                            lastName: row.last_name,
                            gender: row.gender,
                            birthday: row.date_of_birth,
                            email: row.email,
                        };
                        filteredMembers.push(member);
                    });

                    this.connection.end();

                    resolve(filteredMembers);
                });
            });
        });
    }
}

export default MysqlMemberHandler;
