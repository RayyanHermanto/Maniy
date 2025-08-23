import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async sendTransaction(
    userId: string,
    from: string,
    to: string,
    amount: number,
    note: string,
    date?: Date,
  ): Promise<Transaction> {
    const transaction = this.transactionRepo.create({
      userId,
      from,
      to,
      amount,
      note,
      date: date ?? new Date(),
    });
    return this.transactionRepo.save(transaction);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { userId },
      relations: ['user'],
    });
  }
}
