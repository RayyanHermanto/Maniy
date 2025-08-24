import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

export type TransactionType = 'income' | 'expense' | 'transfer';

@ObjectType()
@Entity()
export class Transaction {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Field()
  @Column()
  type: TransactionType; // income | expense | transfer

  @Field({ nullable: true })
  @Column({ nullable: true })
  from?: string; // hanya expense & transfer

  @Field({ nullable: true })
  @Column({ nullable: true })
  to?: string; // hanya income & transfer

  @Field()
  @Column()
  note: string;
}
