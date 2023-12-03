import MessageController from "../src/Controllers/MessageController.js";
import { Message } from "../src/Models/Message.js";
import MysqlMemberHandler from "../src/Services/MemberHandlers/MysqlMemberHandler.js";
import MessageHandlerVersion3 from "../src/Services/MessageHandlers/MessageHandlerVersion3.js";
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
        
        const memberHandlerMock = new MysqlMemberHandler() as jest.Mocked<MysqlMemberHandler>;
        jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue(mockMembers);

        const messageHandlerMock = new MessageHandlerVersion3() as jest.Mocked<MessageHandlerVersion3>;
        jest.spyOn(messageHandlerMock, 'generateMessage').mockImplementation((member) => generateMockMessage(member));
    
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
    
        const memberHandlerMock = new MysqlMemberHandler() as jest.Mocked<MysqlMemberHandler>;
        jest.spyOn(memberHandlerMock, 'getFilteredMembers').mockResolvedValue([]);

        const messageHandlerMock = new MessageHandlerVersion3() as jest.Mocked<MessageHandlerVersion3>;
        jest.spyOn(messageHandlerMock, 'generateMessage').mockReturnValue({} as Message);
    
        const messageController = new MessageController(memberHandlerMock, messageHandlerMock);

        // act
        await messageController.getMessages(req, res);
    
        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith([]);
      });
});
