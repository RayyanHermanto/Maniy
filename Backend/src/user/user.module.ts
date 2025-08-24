import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { WalletModule } from '../wallet/wallet.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => WalletModule),   // fix: forwardRef di-import
    forwardRef(() => CategoryModule)
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
