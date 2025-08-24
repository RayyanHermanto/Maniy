import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Wallet } from '../wallet/wallet.entity';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from 'src/category/category.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Column({ nullable: false })
  password: string;

  @Field(() => [Wallet], { nullable: true })
  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];

  @Field(() => [Transaction], { nullable: true })
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
