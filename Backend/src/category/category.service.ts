import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(name: string, type: string, userId: string): Promise<Category> {
    const category = this.categoryRepository.create({ name, type, userId });
    return await this.categoryRepository.save(category);
  }

  async bulkCreateCategories(categories: { name: string; type: string }[], userId: string) {
    const categoryEntities = categories.map(c =>
      this.categoryRepository.create({ ...c, userId }),
    );
    return await this.categoryRepository.save(categoryEntities);
  }

  // Menambahkan fungsi untuk mengambil semua kategori
  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // Opsional: mengambil kategori berdasarkan userId
  async getCategoriesByUserId(userId: string): Promise<Category[]> {
    return this.categoryRepository.find({ where: { userId } });
  }
}

