import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly TransactionRepo: Repository<Transaction>,
  ) {}

  async sendTransaction(
    userId: string,
    from: string,
    to: string,
    amount: number,
    note: string,
    date?: Date,
  ): Promise<Transaction> {
    const Transaction = this.TransactionRepo.create({
      userId,
      from,
      to,
      amount,
      note,
      date: date ?? new Date(), // isi tanggal sekarang jika tidak dikirim
    });
    return this.TransactionRepo.save(Transaction);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.TransactionRepo.find({ where: { userId } });
  }
}
