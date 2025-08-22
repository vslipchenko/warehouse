# Database Migrations

This project uses TypeORM migrations to manage database schema changes.

## Configuration

- TypeORM's automatic schema synchronization is disabled
- Migrations are run automatically before the application starts in Docker containers

## Migration Scripts

- `npm run migration:run` - Run pending migrations (sets RUN_MIGRATIONS=true)
- `npm run migration:revert` - Revert the last migration (sets RUN_MIGRATIONS=true)
- `npm run migration:create` - Create a new migration file

## How It Works

1. **Fresh Database**: When starting with a fresh database, the `InitSchema` migration will create the `products` table
2. **Existing Database**: When starting with an existing database, only new migrations will be applied
3. **Docker**: Both development and production containers run `npm run migration:run` before starting the application
4. **Application Startup**: Migrations are not loaded during normal application startup to avoid module resolution issues

## Adding New Migrations

When you need to modify the database schema:

1. Create a new migration: `npm run migration:create -- NewFeatureName`
2. Implement the `up()` and `down()` methods in the generated migration file
3. Commit the migration file to version control
4. Deploy - migrations will run automatically on startup
