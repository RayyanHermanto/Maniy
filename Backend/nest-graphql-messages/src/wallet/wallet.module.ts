import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User])],
  providers: [WalletService, WalletResolver],
})
export class WalletModule {}
