import { Field, Float, InputType, Int } from 'type-graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MaxLength,
  Min,
} from 'class-validator';
import {
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
} from '../constants/product';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(PRODUCT_NAME_MAX_LENGTH)
  name!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  quantity!: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  unitPrice!: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(PRODUCT_DESCRIPTION_MAX_LENGTH)
  description?: string;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(PRODUCT_NAME_MAX_LENGTH)
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  @Min(0)
  quantity?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPositive()
  @Min(0)
  unitPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(PRODUCT_DESCRIPTION_MAX_LENGTH)
  description?: string;
}
