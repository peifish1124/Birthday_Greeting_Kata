import MessageController from "../src/Controllers/MessageController.js";
import { Request, Response } from "express";

describe("MessageController Tests Version3", () => {
    it('should return 200 and correct array if selectedMembers is not empty', async () => {
        // arrange
        const req: Request = { query: { month: 12, day: 22 } } as unknown as Request;
        const res: Response = { status: jest.fn(), json: jest.fn() } as unknown as Response;

        const mockMembers = [
            { id: 5, firstName: 'Peter', lastName: 'Wang', gender: 'Male', birthday: new Date(1950, 12, 22), email: 'peter.wang@linecorp.com' }
        ];
        
        function generateMockMessage(member: any): { title: string, content: string } {
          let content: string = `Happy birthday, dear ${member.firstName}!`;
          
          if (getMemberAge(member.birthday) > 49) {
            content += `\n(A greeting picture here)\n`;
          } 
        
          return {
            title: 'Subject: Happy birthday!',
            content,
          };
        }

        function getMemberAge(birthday: Date): number {
          const today = new Date();
          let age = today.getFullYear() - birthday.getFullYear() - 1;
  
          if (today.getMonth() > birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate())) {
              age++;
          }
  
          return age;
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
        expect(res.json).toHaveBeenCalledWith([generateMockMessage(mockMembers[0])]);
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
