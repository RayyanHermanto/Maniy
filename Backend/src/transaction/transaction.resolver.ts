import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  async sendTransaction(
    @Args('userId') userId: string,
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('amount') amount: number,
    @Args('note') note: string,
    @Args('date', { nullable: true }) date?: Date,
  ): Promise<Transaction> {
    return this.transactionService.sendTransaction(userId, from, to, amount, note, date);
  }

  @Query(() => [Transaction])
  async getTransactionsByUserId(@Args('userId') userId: string): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByUserId(userId);
  }
}
