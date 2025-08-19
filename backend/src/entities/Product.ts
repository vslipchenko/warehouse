import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { IsNotEmpty, IsPositive, Min, MaxLength } from 'class-validator';

@ObjectType()
@Entity('products')
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @Field(() => Int)
  @Column('int')
  @IsPositive()
  @Min(0)
  quantity!: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  @IsPositive()
  unitPrice!: number;

  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true })
  @MaxLength(1000)
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

