import MessageController from "../src/Controllers/MessageController.js";
import { Message } from "../src/Models/Message.js";
import MysqlMemberHandler from "../src/Services/MemberHandlers/MysqlMemberHandler.js";
import MessageHandlerVersion1 from "../src/Services/MessageHandlers/MessageHandlerVersion1.js";
import { Request, Response } from "express";
import { generalTestCaseForVersion2, notExistTestCase } from "./testCases.js";


describe("MessageController Tests Version2", () => {
      it('should return 200 and correct array if selectedMembers is not empty', () => {
        generalTestCaseForVersion2.testCases.forEach(async (testCase) => {
          // arrange
          const req = { query: testCase.request } as unknown as Request;
          const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
      
          function generateMockMessage(member: any): { title: string, content: string } {
            let content: string = `Happy birthday, dear ${member.firstName}!`;
            
            if (member.gender == 'Male') {
              content += `\nWe offer special discount 20% off for the following items:\nWhite Wine, iPhone X`;
            } else if (member.gender == 'Female') {
              content += `\nWe offer special discount 50% off for the following items:\nCosmetic, LV Handbags`;
            }
          
            return {
              title: 'Subject: Happy birthday!',
              content,
            };
          }

          const memberHandlerMock = new MysqlMemberHandler() as jest.Mocked<MysqlMemberHandler>;
          jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue(testCase.mockMemberData);

          const messageHandlerMock = new MessageHandlerVersion1() as jest.Mocked<MessageHandlerVersion1>;
          jest.spyOn(messageHandlerMock, 'generateMessage').mockImplementation((member) => generateMockMessage(member));

          const messageController = new MessageController(memberHandlerMock, messageHandlerMock);

          // act
          await messageController.getMessages(req, res);
      
          // assert
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(testCase.expectedOutput);
        });
      });

      it('should return 404 and empty array if selectedMembers is empty', () => {
        notExistTestCase.testCases.forEach(async (testCase) => {
          // arrange
          const req = { query: testCase.request } as unknown as Request;
          const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;

          const memberHandlerMock = new MysqlMemberHandler() as jest.Mocked<MysqlMemberHandler>;
          jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue(testCase.mockMemberData);

          const messageHandlerMock = new MessageHandlerVersion1() as jest.Mocked<MessageHandlerVersion1>;
          jest.spyOn(messageHandlerMock, 'generateMessage').mockReturnValue({} as Message);

          const messageController = new MessageController(memberHandlerMock, messageHandlerMock);

          // act
          await messageController.getMessages(req, res);
      
          // assert
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith(testCase.expectedOutput);
        });
      });
});
