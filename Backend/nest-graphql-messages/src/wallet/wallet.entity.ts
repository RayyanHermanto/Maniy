import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from '../user/user.entity'; // pastikan ada relasi ke user

@ObjectType()
@Entity()
export class Wallet {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  type: string; // contoh: 'bank', 'cash', 'ewallet', dsb

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  balance: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => String)
  @Column()
  currency: string; // contoh: 'IDR', 'USD'

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.wallets, { onDelete: 'CASCADE' })
  user: User;
}
