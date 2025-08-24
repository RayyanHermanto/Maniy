import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}

  @Mutation(() => Wallet)
  async createWallet(
    @Args('userId') userId: string,
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('currency') currency: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Wallet> {
  return this.walletService.createWallet(
    { name, type, currency, description, balance: 0 },
    userId,
  );
}

  @Mutation(() => Wallet)
  async increaseWalletBalance(
    @Args('id') id: string,
    @Args('amount', { type: () => Float }) amount: number,
  ): Promise<Wallet> {
    return this.walletService.increaseBalance(id, amount);
  }

  @Mutation(() => Wallet)
  async decreaseWalletBalance(
    @Args('id') id: string,
    @Args('amount', { type: () => Float }) amount: number,
  ): Promise<Wallet> {
    return this.walletService.decreaseBalance(id, amount);
  }

  @Query(() => [Wallet])
  async getAllWallets(): Promise<Wallet[]> {
    return this.walletService.getAllWallets();
  }

  @Query(() => Wallet, { nullable: true })
  async getWalletById(@Args('id') id: string): Promise<Wallet | null> {
    return this.walletService.getWalletById(id);
  }
}
