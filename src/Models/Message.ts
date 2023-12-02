export interface Message {
  title: string;
  content: string;
}

export class BirthdayMessage implements Message {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}
