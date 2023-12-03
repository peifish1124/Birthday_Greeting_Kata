import XmlMessageController from "../src/Controllers/XmlMessageController.js";
import { Message } from "../src/Models/Message.js";
import MongodbMemberHandler from "../src/Services/MemberHandlers/MongodbMemberHandler.js";
import MessageHandlerVersion1 from "../src/Services/MessageHandlers/MessageHandlerVersion1.js";
import { Request, Response } from "express";

describe("XmlMessageController Tests", () => {
    it('should return 200 and correct XML format if selectedMembers is not empty', async () => {
        // arrange
        const req: Request = { query: { month: 8, day: 8 } } as unknown as Request;
        const res: Response = { set: jest.fn(), status: jest.fn(), send: jest.fn() } as unknown as Response;

        const mockMembers = [
            { id: 1, firstName: 'Robert', lastName: 'Yen', gender: 'Male', birthday: new Date(1985, 8, 8), email: 'robert.yen@linecorp.com' },
            { id: 4, firstName: 'Sherry', lastName: 'Chen', gender: 'Female', birthday: new Date(1993, 8, 8), email: 'sherry.lai@linecorp.com' },
        ];

        function generateMockMessage(member: any): { title: string, content: string } {
            return {
                title: `Subject: Happy birthday!`,
                content: `Happy birthday, dear ${member.firstName}!`,
            };
        }

        const memberHandlerMock = new MongodbMemberHandler() as jest.Mocked<MongodbMemberHandler>;
        jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue(mockMembers);

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

    it('should return 404 and XML format if selectedMembers is empty', async () => {
      // arrange
      const req: Request = { query: { month: 1, day: 15 } } as unknown as Request;
      const res: Response = { set: jest.fn(), status: jest.fn(), send: jest.fn() } as unknown as Response;
  
      const memberHandlerMock = new MongodbMemberHandler() as jest.Mocked<MongodbMemberHandler>;
      jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue([]);

      const messageHandlerMock = new MessageHandlerVersion1() as jest.Mocked<MessageHandlerVersion1>;
      jest.spyOn(messageHandlerMock, 'generateMessage').mockReturnValue({} as Message);
  
      const messageController = new XmlMessageController(memberHandlerMock, messageHandlerMock);

      // act
      await messageController.getMessages(req, res);
  
      // assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/xml');
      expect(res.send).toHaveBeenCalled();
    });
});
