import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async sendMessage(
    userId: string,
    from: string,
    to: string,
    amount: number,
    note: string,
    date?: Date,
  ): Promise<Message> {
    const message = this.messageRepo.create({
      userId,
      from,
      to,
      amount,
      note,
      date: date ?? new Date(), // isi tanggal sekarang jika tidak dikirim
    });
    return this.messageRepo.save(message);
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    return this.messageRepo.find({ where: { userId } });
  }
}
