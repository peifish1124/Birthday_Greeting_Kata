import request from "supertest";
import app from '../src/app.js';

// this is just a sample one, suppose I need to:
// 1. use test database and add test data to it during testing
// 2. use more testcases to confirm the correctness

describe("API testing for version 1 - simple message", () => {
  test("should return 200 and correct data if selectedMembers is not empty", async () => {
      const response = await request(app)
      .get("/api/v1/messages")
      .query({
        month: 8,
        day: 8
      });
  
      expect(response.statusCode).toBe(200);
      expect(response.body[0].title).toBe("Subject: Happy birthday!");
      expect(response.body[0].content).toBe("Happy birthday, dear Robert!");
  });
  test("should return 404 and empty data if selectedMembers is empty", async () => {
    const response = await request(app)
    .get("/api/v1/messages")
    .query({
      month: 1,
      day: 15
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual([]);
});
})