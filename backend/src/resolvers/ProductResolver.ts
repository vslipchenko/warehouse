import {Resolver, Query, Mutation, Arg, ID} from 'type-graphql';
import {AppDataSource} from '../config/database';
import {Product} from '../entities/Product';
import {CreateProductInput, UpdateProductInput} from '../types/ProductInputs';

@Resolver(() => Product)
export class ProductResolver {
  private productRepository = AppDataSource.getRepository(Product);

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productRepository.find({
      order: {createdAt: 'DESC'},
    });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('input') input: CreateProductInput
  ): Promise<Product> {
    const product = this.productRepository.create(input);
    return this.productRepository.save(product);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateProductInput
  ): Promise<Product> {
    const product = await this.productRepository.findOne({where: {id}});

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    Object.assign(product, input);
    return this.productRepository.save(product);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id', () => ID) id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected !== 0;
  }
}
