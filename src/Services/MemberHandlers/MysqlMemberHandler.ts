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

    getFilteredMembers(month: number | undefined, day: number | undefined): Promise<Member[]> {
        const filteredMembers: Member[] = [];

        // if month or day != number, it would be undefined
        const conditions: string[] = [];
        const queryParams: any[] = [];

        if (month) {
            conditions.push("MONTH(date_of_birth) = ?");
            queryParams.push(month);
        }
        if (day) {
            conditions.push("DAY(date_of_birth) = ?");
            queryParams.push(day);
        }

        const conditionsString = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
        const query = `SELECT * FROM members ${conditionsString}`;

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
