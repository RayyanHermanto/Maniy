import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  text: string;
}
