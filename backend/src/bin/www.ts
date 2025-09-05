#!/usr/bin/env node

import {Server} from 'http';
import {createApp} from '../app';
import dotenv from 'dotenv';
import path from 'node:path';

// Load environment variables for the current environment
const environmentName = process.env['NODE_ENV'];
dotenv.config({path: path.resolve(process.cwd(), `.env.${environmentName}`)});

/**
 * Normalize a port into a number, string, or false
 */
const normalizePort = (port: string): number => {
  return parseInt(port);
};

/**
 * Event listener for HTTP server "error" event
 */
const onError = (error: NodeJS.ErrnoException, port: number): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event
 */
const onListening = (server: Server): void => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.log('Server listening on ' + bind);
};

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    const app = await createApp();

    // Get port from environment and store in Express
    const port = normalizePort(process.env['PORT'] || '3000');
    app.set('port', port);

    // Create HTTP server
    const server = app.listen(port);
    server.on('error', (error: NodeJS.ErrnoException) => onError(error, port));
    server.on('listening', () => onListening(server));

    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(
      `🚀 GraphQL endpoint ready at http://localhost:${port}/graphql`
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
