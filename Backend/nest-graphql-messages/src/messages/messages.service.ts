import { Injectable } from '@nestjs/common';
import { Message } from './message.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  sendMessage(userId: string, text: string): Message {
    const message: Message = {
      id: uuidv4(),
      userId,
      text,
    };
    this.messages.push(message);
    return message;
  }

  getMessagesByUserId(userId: string): Message[] {
    return this.messages.filter((msg) => msg.userId === userId);
  }
}
