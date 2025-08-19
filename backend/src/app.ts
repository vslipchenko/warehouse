import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { buildSchema } from 'type-graphql';
import { AppDataSource } from './config/database';
import { ProductResolver } from './resolvers/ProductResolver';

/**
 * Creates and configures the Express application
 */
export async function createApp(): Promise<express.Application> {
  const app = express();

  // Basic middleware
  app.use(morgan('combined'));

  // Initialize database connection
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [ProductResolver],
    validate: false,
  });

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  // Apply GraphQL middleware with proper CORS and body parsing
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({ dataSource: AppDataSource }),
    })
  );

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  return app;
}

