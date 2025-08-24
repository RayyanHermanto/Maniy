import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { validate as isUuid } from 'uuid';

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
    // Validasi UUID
    if (!isUuid(userId)) {
      throw new Error('userId is not a valid UUID');
    }

    // Buat transaksi baru
    const transaction = this.transactionRepo.create({
      userId,
      from,
      to,
      amount,
      note,
      date: date ?? new Date(),
    });

    // Simpan transaksi ke DB
    const savedTransaction = await this.transactionRepo.save(transaction);

    // Ambil transaksi kembali beserta relasi user
    const transactionWithUser = await this.transactionRepo.findOne({
      where: { id: savedTransaction.id },
      relations: ['user'], // pastikan 'user' adalah nama relasi di Transaction entity
    });

    // Pastikan tidak null
    if (!transactionWithUser) {
      throw new Error('Transaction not found after saving');
    }

    return transactionWithUser;
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { userId },
      relations: ['user'],
    });
  }
}
