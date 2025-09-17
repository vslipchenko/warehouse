import {DataSource} from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env['DB_HOST'] || 'database',
  port: parseInt(process.env['DB_PORT'] || '3306'),
  username: process.env['DB_USERNAME'] || 'warehouse',
  password: process.env['DB_PASSWORD'] || 'warehousepassword',
  database: process.env['DB_DATABASE'] || 'warehouse',
  logging: process.env['NODE_ENV'] !== 'production',
  entities:
    process.env['NODE_ENV'] === 'production'
      ? ['dist/entities/**/*.js']
      : ['src/entities/**/*.ts'],
  migrations:
    process.env['NODE_ENV'] === 'production'
      ? ['dist/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],
});
