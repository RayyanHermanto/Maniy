import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.userService.create({ name, email });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }
}
