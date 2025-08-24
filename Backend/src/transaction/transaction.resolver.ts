import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { WalletService } from '../wallet/wallet.service';
import { Float } from '@nestjs/graphql';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService, // ✅ inject WalletService di constructor
  ) {}

  @Mutation(() => Transaction)
  async sendTransaction(
    @Args('userId') userId: string,
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('note') note: string,
    @Args('date', { nullable: true }) date?: Date,
  ): Promise<Transaction> {
    // cari wallet "from"
    const fromWallet = await this.walletService.findByUserIdAndName(userId, from);

    // cari wallet "to"
    const toWallet = await this.walletService.findByUserIdAndName(userId, to);

    if (!fromWallet && !toWallet) {
      throw new Error('Either "from" or "to" wallet must exist');
    }

    // kalau wallet "from" ada → kurangi balance
    if (fromWallet) {
      await this.walletService.decreaseBalance(fromWallet.id, amount);
    }

    // kalau wallet "to" ada → tambah balance
    if (toWallet) {
      await this.walletService.increaseBalance(toWallet.id, amount);
    }

    // simpan transaksi
    return this.transactionService.sendTransaction(
      userId,
      from,
      to,
      amount,
      note,
      date,
    );
  }

  @Query(() => [Transaction])
  async getTransactionsByUserId(
    @Args('userId') userId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByUserId(userId);
  }
}
