import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { IsNotEmpty, IsPositive, MaxLength, Min } from 'class-validator';
import {
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
} from '../constants/product';

@ObjectType()
@Entity('products')
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: PRODUCT_NAME_MAX_LENGTH })
  @IsNotEmpty()
  @MaxLength(PRODUCT_NAME_MAX_LENGTH)
  name!: string;

  @Field(() => Int)
  @Column('int')
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  quantity!: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  unitPrice!: number;

  @Field({ nullable: true })
  @Column({ length: PRODUCT_DESCRIPTION_MAX_LENGTH, nullable: true })
  @MaxLength(PRODUCT_DESCRIPTION_MAX_LENGTH)
  description?: string;

  // @Field({ nullable: true })
  // @Column({ length: 500, nullable: true })
  // @MaxLength(500)
  // imageUrl?: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
