import XmlMessageController from "../src/Controllers/XmlMessageController.js";
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

        const memberHandlerMock = {
            getFilteredMembers: jest.fn().mockResolvedValue(mockMembers),
        };

        const messageHandlerMock = {
            generateMessage: jest.fn().mockImplementation((member) => generateMockMessage(member)),
        };

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
  
      const memberHandlerMock = {
        getFilteredMembers: jest.fn().mockResolvedValue([]),
      };

      const messageHandlerMock = {
          generateMessage: jest.fn().mockReturnValue([]),
      };
  
      const messageController = new XmlMessageController(memberHandlerMock, messageHandlerMock);

      // act
      await messageController.getMessages(req, res);
  
      // assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/xml');
      expect(res.send).toHaveBeenCalled();
    });
});
