-- Create warehouse database if it doesn't exist
CREATE DATABASE IF NOT EXISTS warehouse;
USE warehouse;

-- Create warehouse user if it doesn't exist
CREATE USER IF NOT EXISTS 'warehouse'@'%' IDENTIFIED BY 'warehousepassword';
GRANT ALL PRIVILEGES ON warehouse.* TO 'warehouse'@'%';
FLUSH PRIVILEGES;

-- Insert sample data (will be created by TypeORM on first run)
-- The products table will be automatically created by TypeORM migration
-- This script ensures the database and user are properly set up

