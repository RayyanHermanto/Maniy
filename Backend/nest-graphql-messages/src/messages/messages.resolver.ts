import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './message.model';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  sendMessage(
    @Args('userId') userId: string,
    @Args('text') text: string,
  ): Message {
    return this.messagesService.sendMessage(userId, text);
  }

  @Query(() => [Message])
  getMessagesByUserId(@Args('userId') userId: string): Message[] {
    return this.messagesService.getMessagesByUserId(userId);
  }
}
