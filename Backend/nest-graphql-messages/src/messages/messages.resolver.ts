import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  async sendMessage(
    @Args('userId') userId: string,
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('amount') amount: number,
    @Args('note') note: string,
    @Args('date', { nullable: true }) date?: Date,
  ): Promise<Message> {
    return this.messagesService.sendMessage(userId, from, to, amount, note, date);
  }

  @Query(() => [Message])
  async getMessagesByUserId(@Args('userId') userId: string): Promise<Message[]> {
    return this.messagesService.getMessagesByUserId(userId);
  }
}
