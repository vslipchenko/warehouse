import 'reflect-metadata';
import { validate } from 'class-validator';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../../types/ProductInputs';
import {
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} from '../../constants/product';

describe('CreateProductInput', () => {
  let input: CreateProductInput;

  beforeEach(() => {
    input = new CreateProductInput();
  });

  describe('Validation', () => {
    it('should pass validation with valid data', async () => {
      input.name = 'Valid Product';
      input.quantity = 10;
      input.unitPrice = 25.99;
      input.description = 'Valid description';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation with empty name', async () => {
      input.name = '';
      input.quantity = 10;
      input.unitPrice = 25.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('name');
      expect(errors[0]?.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation with name exceeding max length', async () => {
      input.name = 'a'.repeat(PRODUCT_NAME_MAX_LENGTH + 1);
      input.quantity = 10;
      input.unitPrice = 25.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('name');
      expect(errors[0]?.constraints).toHaveProperty('maxLength');
    });

    it('should fail validation with negative quantity', async () => {
      input.name = 'Valid Product';
      input.quantity = -1;
      input.unitPrice = 25.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('quantity');
      expect(errors[0]?.constraints).toHaveProperty('min');
    });

    it('should fail validation with zero quantity', async () => {
      input.name = 'Valid Product';
      input.quantity = 0;
      input.unitPrice = 25.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('quantity');
      expect(errors[0]?.constraints).toHaveProperty('isPositive');
    });

    it('should fail validation with negative unit price', async () => {
      input.name = 'Valid Product';
      input.quantity = 10;
      input.unitPrice = -1.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('unitPrice');
      expect(errors[0]?.constraints).toHaveProperty('min');
    });

    it('should fail validation with zero unit price', async () => {
      input.name = 'Valid Product';
      input.quantity = 10;
      input.unitPrice = 0;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('unitPrice');
      expect(errors[0]?.constraints).toHaveProperty('isPositive');
    });

    it('should fail validation with description exceeding max length', async () => {
      input.name = 'Valid Product';
      input.quantity = 10;
      input.unitPrice = 25.99;
      input.description = 'a'.repeat(PRODUCT_DESCRIPTION_MAX_LENGTH + 1);

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('description');
      expect(errors[0]?.constraints).toHaveProperty('maxLength');
    });

    it('should pass validation with undefined description', async () => {
      input.name = 'Valid Product';
      input.quantity = 10;
      input.unitPrice = 25.99;
      // description is already undefined by default

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with empty description', async () => {
      input.name = 'Valid Product';
      input.quantity = 10;
      input.unitPrice = 25.99;
      input.description = '';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation with missing required fields', async () => {
      const errors = await validate(input);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'name')).toBe(true);
      expect(errors.some((e) => e.property === 'quantity')).toBe(true);
      expect(errors.some((e) => e.property === 'unitPrice')).toBe(true);
    });
  });

  describe('Data Types', () => {
    it('should handle string name correctly', () => {
      input.name = 'Test Product';
      expect(typeof input.name).toBe('string');
      expect(input.name).toBe('Test Product');
    });

    it('should handle integer quantity correctly', () => {
      input.quantity = 42;
      expect(typeof input.quantity).toBe('number');
      expect(Number.isInteger(input.quantity)).toBe(true);
      expect(input.quantity).toBe(42);
    });

    it('should handle float unit price correctly', () => {
      input.unitPrice = 19.99;
      expect(typeof input.unitPrice).toBe('number');
      expect(input.unitPrice).toBe(19.99);
    });

    it('should handle optional description correctly', () => {
      input.description = 'Optional description';
      expect(typeof input.description).toBe('string');
      expect(input.description).toBe('Optional description');
    });
  });
});

describe('UpdateProductInput', () => {
  let input: UpdateProductInput;

  beforeEach(() => {
    input = new UpdateProductInput();
  });

  describe('Validation', () => {
    it('should pass validation with all fields', async () => {
      input.name = 'Updated Product';
      input.quantity = 20;
      input.unitPrice = 35.99;
      input.description = 'Updated description';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with only name', async () => {
      input.name = 'Updated Product';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with only quantity', async () => {
      input.quantity = 20;

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with only unit price', async () => {
      input.unitPrice = 35.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with only description', async () => {
      input.description = 'Updated description';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with empty object', async () => {
      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation with empty name', async () => {
      input.name = '';

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('name');
      expect(errors[0]?.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation with name exceeding max length', async () => {
      input.name = 'a'.repeat(PRODUCT_NAME_MAX_LENGTH + 1);

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('name');
      expect(errors[0]?.constraints).toHaveProperty('maxLength');
    });

    it('should fail validation with negative quantity', async () => {
      input.quantity = -1;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('quantity');
      expect(errors[0]?.constraints).toHaveProperty('min');
    });

    it('should fail validation with zero quantity', async () => {
      input.quantity = 0;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('quantity');
      expect(errors[0]?.constraints).toHaveProperty('isPositive');
    });

    it('should fail validation with negative unit price', async () => {
      input.unitPrice = -1.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('unitPrice');
      expect(errors[0]?.constraints).toHaveProperty('min');
    });

    it('should fail validation with zero unit price', async () => {
      input.unitPrice = 0;

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('unitPrice');
      expect(errors[0]?.constraints).toHaveProperty('isPositive');
    });

    it('should fail validation with description exceeding max length', async () => {
      input.description = 'a'.repeat(PRODUCT_DESCRIPTION_MAX_LENGTH + 1);

      const errors = await validate(input);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('description');
      expect(errors[0]?.constraints).toHaveProperty('maxLength');
    });

    it('should pass validation with undefined description', async () => {
      // description is already undefined by default

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with empty description', async () => {
      input.description = '';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Partial Updates', () => {
    it('should allow partial updates with only name', async () => {
      input.name = 'Partial Update';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should allow partial updates with only quantity', async () => {
      input.quantity = 15;

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should allow partial updates with only unit price', async () => {
      input.unitPrice = 29.99;

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should allow partial updates with only description', async () => {
      input.description = 'Partial description update';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should allow partial updates with multiple fields', async () => {
      input.name = 'Multi Update';
      input.quantity = 25;

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum valid values', async () => {
      input.name = 'a'.repeat(PRODUCT_NAME_MAX_LENGTH);
      input.quantity = Number.MAX_SAFE_INTEGER;
      input.unitPrice = 999999.99;
      input.description = 'a'.repeat(PRODUCT_DESCRIPTION_MAX_LENGTH);

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should handle minimum valid values', async () => {
      input.name = 'A';
      input.quantity = 1;
      input.unitPrice = 0.01;
      input.description = '';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should handle special characters in name', async () => {
      input.name = 'Product with special chars: !@#$%^&*()';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });

    it('should handle unicode characters in description', async () => {
      input.description = 'Description with unicode: 🚀🌟🎉';

      const errors = await validate(input);
      expect(errors).toHaveLength(0);
    });
  });
});
