import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from '../user/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createWallet(data: Partial<Wallet>, userId: string): Promise<Wallet> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const wallet = this.walletRepo.create({
      ...data,
      user, // set user relasi
    });

    return this.walletRepo.save(wallet);
  }

  async getAllWallets(): Promise<Wallet[]> {
    return this.walletRepo.find({ relations: ['user'] });
  }

  async getWalletById(id: string): Promise<Wallet | null> {
    return this.walletRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async increaseBalance(id: string, amount: number): Promise<Wallet> {
    const wallet = await this.walletRepo.findOne({ where: { id } });
    if (!wallet) throw new NotFoundException('Wallet not found');
    if (amount < 0) throw new BadRequestException('Amount must be positive');
    wallet.balance += amount;
    return this.walletRepo.save(wallet);
  }

  async decreaseBalance(id: string, amount: number): Promise<Wallet> {
    const wallet = await this.walletRepo.findOne({ where: { id } });
    if (!wallet) throw new NotFoundException('Wallet not found');
    if (amount < 0) throw new BadRequestException('Amount must be positive');
    if (wallet.balance < amount) throw new BadRequestException('Insufficient balance');
    wallet.balance -= amount;
    return this.walletRepo.save(wallet);
  }
}
