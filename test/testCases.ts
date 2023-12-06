import { Member } from "../src/Models/Member.js";
import { Message } from "../src/Models/Message.js";

interface TestCase {
  testCases: {
    request: { month: number; day: number };
    mockMemberData: Member[];
    expectedOutput: Message[];
  }[];
}


export const generalTestCase: TestCase = {
  testCases: [
    {
      request: { month: 4, day: 5 },
      mockMemberData: [
        { id: 3, firstName: 'Miki', lastName: 'Lai', gender: 'FeMale', birthday: new Date(1993, 4, 5), email: 'miki.lai@linecorp.com' }
      ],
      expectedOutput: [
        {
          title: 'Subject: Happy birthday!',
          content: 'Happy birthday, dear Miki!',
        },
      ]
    }, 
    {
      request: { month: 10, day: 10 },
      mockMemberData: [
        { id: 2, firstName: 'Cid', lastName: 'Change', gender: 'Male', birthday: new Date(1990, 10, 10), email: 'cid.change@linecorp.com' }
      ],
      expectedOutput: [
        {
          title: 'Subject: Happy birthday!',
          content: 'Happy birthday, dear Cid!',
        },
      ]
    }, 
    {
      request: { month: 8, day: 8 },
      mockMemberData: [
        { id: 1, firstName: 'Robert', lastName: 'Yen', gender: 'Male', birthday: new Date(1985, 8, 8), email: 'robert.yen@linecorp.com' },
        { id: 4, firstName: 'Sherry', lastName: 'Chen', gender: 'Female', birthday: new Date(1993, 8, 8), email: 'sherry.lai@linecorp.com' },
      ],
      expectedOutput: [
        {
          title: 'Subject: Happy birthday!',
          content: 'Happy birthday, dear Robert!',
        },
        {
          title: 'Subject: Happy birthday!',
          content: 'Happy birthday, dear Sherry!',
        },
      ]
    }

  ]
};

export const notExistTestCase: TestCase = {
  testCases: [
    {
      request: { month: 1, day: 5 },
      mockMemberData: [],
      expectedOutput: []
    }, 
    {
      request: { month: 10, day: 5 },
      mockMemberData: [],
      expectedOutput: []
    },  
    {
      request: { month: 3, day: 5 },
      mockMemberData: [],
      expectedOutput: []
    }
  ]
}

