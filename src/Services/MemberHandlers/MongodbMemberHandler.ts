import { MongoClient, Db } from 'mongodb';
import { Member } from "../../Models/Member.js";

import IMemberHandler from "./IMemberHandler.js";

class MongodbMemberHandler implements IMemberHandler {
    private client: MongoClient;
    private db: Db;

    constructor() {
      const uri = process.env.MONGO_URL || 'mongodb+srv://<username>:<password>@cluster0.example.com/dbName';
      const dbName = process.env.MONGO_DB_NAME || '';

      this.client = new MongoClient(uri);
      this.db = this.client.db(dbName);
    }

    async getFilteredMembers(month: number | undefined, day: number | undefined): Promise<Member[]> {
        const filteredMembers: Member[] = [];
        try {
            await this.client.connect();

            const collection = this.db.collection('members');

            const results = await collection.find({
                $expr: {
                    $and: [
                        { $eq: [{ $month: '$date_of_birth' }, month || { $month: '$date_of_birth' }] },
                        { $eq: [{ $dayOfMonth: '$date_of_birth' }, day || { $dayOfMonth: '$date_of_birth' }] },
                    ],
                },
            }).toArray();

            results.forEach((row: any) => {
                const member: Member = {
                    id: row._id,
                    firstName: row.first_name,
                    lastName: row.last_name,
                    gender: row.gender,
                    birthday: row.date_of_birth,
                    email: row.email,
                };
                filteredMembers.push(member);
            });

            return filteredMembers;
        } catch (error) {
            throw new Error(`Error fetching members: ${error}`);
        } finally {
            await this.client.close();
        }
    }
}

export default MongodbMemberHandler;
