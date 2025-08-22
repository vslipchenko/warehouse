import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] || '3306'),
  username: process.env['DB_USERNAME'] || 'warehouse',
  password: process.env['DB_PASSWORD'] || 'warehousepassword',
  database: process.env['DB_DATABASE'] || 'warehouse',
  synchronize: true,
  logging: process.env['NODE_ENV'] === 'development',
  entities: [Product],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});
