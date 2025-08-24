import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('userId') userId: string,
  ): Promise<Category> {
    return this.categoryService.createCategory(name, type, userId);
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  // Opsional: query berdasarkan userId
  @Query(() => [Category])
  async categoriesByUser(@Args('userId') userId: string): Promise<Category[]> {
    return this.categoryService.getCategoriesByUserId(userId);
  }
}
