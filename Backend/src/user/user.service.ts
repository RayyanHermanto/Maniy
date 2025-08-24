import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { CategoryService } from 'src/category/category.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly walletService: WalletService,
    private readonly categoryService: CategoryService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['wallets'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['wallets'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
    }

    async create(data: Partial<User>): Promise<User> {
    if (!data.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    const wallets = [
      { name: 'cash', type: 'default', currency: 'idr', description: 'Default cash wallet', balance: 0 },
      { name: 'account', type: 'default', currency: 'idr', description: 'Default account wallet', balance: 0 },
    ];

    for (const w of wallets) {
      await this.walletService.createWallet(w, user.id);
    }

    const categories = [
      // income
      { name: 'allowance', type: 'income' },
      { name: 'salary', type: 'income' },
      { name: 'petty cash', type: 'income' },
      { name: 'bonus', type: 'income' },
      // expense
      { name: 'food', type: 'expense' },
      { name: 'social life', type: 'expense' },
      { name: 'pets', type: 'expense' },
      { name: 'transport', type: 'expense' },
      { name: 'culture', type: 'expense' },
      { name: 'household', type: 'expense' },
      { name: 'apparel', type: 'expense' },
      { name: 'beauty', type: 'expense' },
      { name: 'health', type: 'expense' },
      { name: 'education', type: 'expense' },
      { name: 'gift', type: 'expense' },
      { name: 'other', type: 'expense' },
    ];

    await this.categoryService.bulkCreateCategories(categories, user.id);

    return user;
  }

  async remove(id: string): Promise<boolean> {
  const result = await this.userRepository.delete(id);
  return (result.affected ?? 0) > 0;
  }

}
