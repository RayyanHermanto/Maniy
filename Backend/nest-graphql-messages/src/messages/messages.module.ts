import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
