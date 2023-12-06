import XmlMessageController from "../src/Controllers/XmlMessageController.js";
import { Message } from "../src/Models/Message.js";
import MongodbMemberHandler from "../src/Services/MemberHandlers/MongodbMemberHandler.js";
import MessageHandlerVersion1 from "../src/Services/MessageHandlers/MessageHandlerVersion1.js";
import { Request, Response } from "express";
import { generalTestCase, notExistTestCase } from "./testCases.js";

describe("XmlMessageController Tests", () => {
    it('should return 200 and correct XML format if selectedMembers is not empty', async () => {
      generalTestCase.testCases.forEach(async (testCase) => {
        // arrange
        const req = { query: testCase.request } as unknown as Request;
        const res = { set: jest.fn(), status: jest.fn(), send: jest.fn() } as unknown as Response;
    
        function generateMockMessage(member: any): { title: string, content: string } {
          return {
            title: `Subject: Happy birthday!`,
            content: `Happy birthday, dear ${member.firstName}!`,
          };
        }

        const memberHandlerMock = new MongodbMemberHandler() as jest.Mocked<MongodbMemberHandler>;
        jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue(testCase.mockMemberData);

        const messageHandlerMock = new MessageHandlerVersion1() as jest.Mocked<MessageHandlerVersion1>;
        jest.spyOn(messageHandlerMock, 'generateMessage').mockImplementation((member) => generateMockMessage(member));

        const xmlMessageController = new XmlMessageController(memberHandlerMock, messageHandlerMock);

        // act
        await xmlMessageController.getMessages(req, res);
    
        // assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/xml');
        expect(res.send).toHaveBeenCalled();
      });
    });

  
    it('should return 404 and XML format if selectedMembers is empty', async () => {
      notExistTestCase.testCases.forEach(async (testCase) => {
        // arrange
        const req = { query: testCase.request } as unknown as Request;
        const res = { set: jest.fn(), status: jest.fn(), send: jest.fn() } as unknown as Response;

        const memberHandlerMock = new MongodbMemberHandler() as jest.Mocked<MongodbMemberHandler>;
        jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue(testCase.mockMemberData);

        const messageHandlerMock = new MessageHandlerVersion1() as jest.Mocked<MessageHandlerVersion1>;
        jest.spyOn(messageHandlerMock, 'generateMessage').mockReturnValue({} as Message);

        const xmlMessageController = new XmlMessageController(memberHandlerMock, messageHandlerMock);

        // act
        await xmlMessageController.getMessages(req, res);
    
        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/xml');
        expect(res.send).toHaveBeenCalled();
      });
    });
});
