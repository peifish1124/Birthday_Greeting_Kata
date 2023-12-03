import MessageController from "../src/Controllers/MessageController.js";
import { Request, Response } from "express";

describe("MessageController Tests Version1", () => {
    it('should return 200 and correct array if selectedMembers is not empty', async () => {
        // arrange
        const req: Request = { query: { month: 8, day: 8 } } as unknown as Request;
        const res: Response = { status: jest.fn(), json: jest.fn() } as unknown as Response;

        const mockMembers = [
            { id: 1, firstName: 'Robert', lastName: 'Yen', gender: 'Male', birthday: new Date(1985, 8, 8), email: 'robert.yen@linecorp.com' },
            { id: 4, firstName: 'Sherry', lastName: 'Chen', gender: 'Female', birthday: new Date(1993, 8, 8), email: 'sherry.lai@linecorp.com' },
        ];
        
        function generateMockMessage(member: any): { title: string, content: string } {
          let content: string = `Happy birthday, dear ${member.firstName}!`;
          
          if (member.gender === 'Male') {
            content += `\nWe offer special discount 20% off for the following items:\nWhite Wine, iPhone X`;
          } else if (member.gender === 'Female') {
            content += `\nWe offer special discount 50% off for the following items:\nCosmetic, LV Handbags`;
          }
        
          return {
            title: 'Subject: Happy birthday!',
            content,
          };
        }
        
        const memberHandlerMock = {
          getFilteredMembers: jest.fn().mockResolvedValue(mockMembers),
        };

        const messageHandlerMock = {
          generateMessage: jest.fn().mockImplementation((member) => generateMockMessage(member)),
        };
    
        const messageController = new MessageController(memberHandlerMock, messageHandlerMock);

        // act
        await messageController.getMessages(req, res);
        
        // assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([generateMockMessage(mockMembers[0]), generateMockMessage(mockMembers[1])]);
      });

      it('should return 404 and empty array if selectedMembers is empty', async () => {
        // arrange
        const req: Request = { query: { month: 1, day: 15 } } as unknown as Request;
        const res: Response = { status: jest.fn(), json: jest.fn() } as unknown as Response;
    
        const memberHandlerMock = {
          getFilteredMembers: jest.fn().mockResolvedValue([]),
        };

        const messageHandlerMock = {
            generateMessage: jest.fn().mockReturnValue([]),
        };
    
        const messageController = new MessageController(memberHandlerMock, messageHandlerMock);

        // act
        await messageController.getMessages(req, res);
    
        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith([]);
      });
});
