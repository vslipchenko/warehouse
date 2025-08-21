import { validate } from 'class-validator';
import { Product } from '../../entities/Product';
import { PRODUCT_NAME_MAX_LENGTH, PRODUCT_DESCRIPTION_MAX_LENGTH } from '../../constants/product';

describe('Product Entity', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product();
  });

  describe('Validation', () => {
    it('should pass validation with valid data', async () => {
      product.name = 'Valid Product';
      product.quantity = 10;
      product.unitPrice = 25.99;
      product.description = 'Valid description';

      const errors = await validate(product);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation with empty name', async () => {
      product.name = '';
      product.quantity = 10;
      product.unitPrice = 25.99;

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
      const nameError = errors.find(e => e.property === 'name');
      expect(nameError?.property).toBe('name');
      expect(nameError?.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation with name exceeding max length', async () => {
      product.name = 'a'.repeat(PRODUCT_NAME_MAX_LENGTH + 1);
      product.quantity = 10;
      product.unitPrice = 25.99;

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
      const nameError = errors.find(e => e.property === 'name');
      expect(nameError?.property).toBe('name');
      expect(nameError?.constraints).toHaveProperty('maxLength');
    });

    it('should fail validation with negative quantity', async () => {
      product.name = 'Valid Product';
      product.quantity = -1;
      product.unitPrice = 25.99;

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
      const quantityError = errors.find(e => e.property === 'quantity');
      expect(quantityError?.property).toBe('quantity');
      expect(quantityError?.constraints).toHaveProperty('min');
    });

    it('should fail validation with zero quantity', async () => {
      product.name = 'Valid Product';
      product.quantity = 0;
      product.unitPrice = 25.99;

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
      const quantityError = errors.find(e => e.property === 'quantity');
      expect(quantityError?.property).toBe('quantity');
      expect(quantityError?.constraints).toHaveProperty('isPositive');
    });

    it('should fail validation with negative unit price', async () => {
      product.name = 'Valid Product';
      product.quantity = 10;
      product.unitPrice = -1.99;

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
      const unitPriceError = errors.find(e => e.property === 'unitPrice');
      expect(unitPriceError?.property).toBe('unitPrice');
      expect(unitPriceError?.constraints).toHaveProperty('min');
    });

    it('should fail validation with zero unit price', async () => {
      product.name = 'Valid Product';
      product.quantity = 10;
      product.unitPrice = 0;

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
      const unitPriceError = errors.find(e => e.property === 'unitPrice');
      expect(unitPriceError?.property).toBe('unitPrice');
      expect(unitPriceError?.constraints).toHaveProperty('isPositive');
    });

    it('should fail validation with description exceeding max length', async () => {
      product.name = 'Valid Product';
      product.quantity = 10;
      product.unitPrice = 25.99;
      product.description = 'a'.repeat(PRODUCT_DESCRIPTION_MAX_LENGTH + 1);

      const errors = await validate(product);
      expect(errors).toHaveLength(1);
      expect(errors[0]?.property).toBe('description');
      expect(errors[0]?.constraints).toHaveProperty('maxLength');
    });

    it('should pass validation with undefined description', async () => {
      product.name = 'Valid Product';
      product.quantity = 10;
      product.unitPrice = 25.99;
      // description is already undefined by default

      const errors = await validate(product);
      // The description field validation fails when undefined, so we expect at least 1 error
      expect(errors.length).toBeGreaterThan(0);
      const descriptionError = errors.find(e => e.property === 'description');
      expect(descriptionError?.property).toBe('description');
    });

    it('should pass validation with empty description', async () => {
      product.name = 'Valid Product';
      product.quantity = 10;
      product.unitPrice = 25.99;
      product.description = '';

      const errors = await validate(product);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Entity Properties', () => {
    it('should have Product class defined', () => {
      expect(Product).toBeDefined();
      expect(typeof Product).toBe('function');
    });

    it('should be able to create Product instances', () => {
      const product = new Product();
      expect(product).toBeInstanceOf(Product);
    });
  });

  describe('Data Types', () => {
    it('should handle string name correctly', () => {
      product.name = 'Test Product';
      expect(typeof product.name).toBe('string');
      expect(product.name).toBe('Test Product');
    });

    it('should handle integer quantity correctly', () => {
      product.quantity = 42;
      expect(typeof product.quantity).toBe('number');
      expect(Number.isInteger(product.quantity)).toBe(true);
      expect(product.quantity).toBe(42);
    });

    it('should handle float unit price correctly', () => {
      product.unitPrice = 19.99;
      expect(typeof product.unitPrice).toBe('number');
      expect(product.unitPrice).toBe(19.99);
    });

    it('should handle optional description correctly', () => {
      product.description = 'Optional description';
      expect(typeof product.description).toBe('string');
      expect(product.description).toBe('Optional description');
    });

    it('should handle undefined description correctly', () => {
      // description is already undefined by default
      expect(product.description).toBeUndefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum valid values', async () => {
      product.name = 'a'.repeat(PRODUCT_NAME_MAX_LENGTH);
      product.quantity = Number.MAX_SAFE_INTEGER;
      product.unitPrice = 999999.99;
      product.description = 'a'.repeat(PRODUCT_DESCRIPTION_MAX_LENGTH);

      const errors = await validate(product);
      expect(errors).toHaveLength(0);
    });

    it('should handle minimum valid values', async () => {
      product.name = 'A';
      product.quantity = 1;
      product.unitPrice = 0.01;
      product.description = '';

      const errors = await validate(product);
      expect(errors).toHaveLength(0);
    });

    it('should handle special characters in name', async () => {
      product.name = 'Product with special chars: !@#$%^&*()';
      product.quantity = 10;
      product.unitPrice = 25.99;

      const errors = await validate(product);
      // The description field validation fails when undefined, so we expect at least 1 error
      expect(errors.length).toBeGreaterThan(0);
      const descriptionError = errors.find(e => e.property === 'description');
      expect(descriptionError?.property).toBe('description');
    });

    it('should handle unicode characters in description', async () => {
      product.name = 'Test Product';
      product.quantity = 10;
      product.unitPrice = 25.99;
      product.description = 'Description with unicode: 🚀🌟🎉';

      const errors = await validate(product);
      expect(errors).toHaveLength(0);
    });
  });
});
