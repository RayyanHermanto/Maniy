import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction} from './transaction.entity';
import type { TransactionType } from './transaction.entity';
import { WalletService } from '../wallet/wallet.service';
import { Float } from '@nestjs/graphql';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
  ) {}

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('userId') userId: string,
    @Args('type') type: TransactionType, // "income" | "expense" | "transfer"
    @Args('note') note: string,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('from', { nullable: true }) from?: string,
    @Args('to', { nullable: true }) to?: string,
    @Args('date', { nullable: true }) date?: Date,
  ): Promise<Transaction> {

    // Validasi type & from/to
    if (type === 'income' && !to) throw new Error('"to" wallet is required for income');
    if (type === 'expense' && !from) throw new Error('"from" wallet is required for expense');
    if (type === 'transfer' && (!from || !to)) throw new Error('"from" and "to" wallets are required for transfer');

    // Update wallet balances
    if (from) {
      const fromWallet = await this.walletService.findByUserIdAndName(userId, from);
      if (!fromWallet) throw new Error(`From wallet "${from}" not found`);
      await this.walletService.decreaseBalance(fromWallet.id, amount);
    }

    if (to) {
      const toWallet = await this.walletService.findByUserIdAndName(userId, to);
      if (!toWallet) throw new Error(`To wallet "${to}" not found`);
      await this.walletService.increaseBalance(toWallet.id, amount);
    }

    // Simpan transaksi
    return this.transactionService.createTransaction({
      userId,
      type,
      note,
      amount,
      from,
      to,
      date,
    });
  }

  @Query(() => [Transaction])
  async getTransactionsByUserId(
    @Args('userId') userId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByUserId(userId);
  }
}
