import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from '../user/user.entity';

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

  // 🔹 Foreign Key eksplisit
  @Field(() => String)
  @Column()
  userId: string;

  // 🔹 Relasi ke User
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.wallets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // pastikan FK terhubung
  user: User;
}
