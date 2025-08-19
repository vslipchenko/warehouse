import { InputType, Field, Int, Float } from 'type-graphql';
import { IsNotEmpty, IsPositive, Min, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @Field(() => Int)
  @IsPositive()
  @Min(0)
  quantity!: number;

  @Field(() => Float)
  @IsPositive()
  unitPrice!: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(500)
  // imageUrl?: string;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  @Min(0)
  quantity?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPositive()
  unitPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(500)
  // imageUrl?: string;
}

