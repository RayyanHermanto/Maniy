import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => UserModule),   // fix: import UserModule, bukan cuma entity
  ],
  providers: [WalletService, WalletResolver],
  exports: [WalletService],
})
export class WalletModule {}
