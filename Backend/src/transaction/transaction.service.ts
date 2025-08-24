import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './transaction.entity';
import { validate as isUuid } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  // transaction.service.ts
async createTransaction(data: {
  userId: string;
  type: TransactionType;
  note: string;
  amount: number;
  from?: string;
  to?: string;
  date?: Date;
}): Promise<Transaction> {
  const transaction = this.transactionRepo.create({
  userId: data.userId,
  type: data.type,
  note: data.note,
  amount: data.amount,
  from: data.from ?? null,
  to: data.to ?? null,
  date: data.date ?? new Date(),
} as Partial<Transaction>);


  const savedTransaction = await this.transactionRepo.save(transaction);

  return this.transactionRepo.findOneOrFail({
    where: { id: savedTransaction.id },
    relations: ['user'],
  });
}

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { userId },
      relations: ['user'],
    });
  }
}
