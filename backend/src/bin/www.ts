#!/usr/bin/env node

import { createApp } from '../app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Normalize a port into a number, string, or false
 */
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event
 */
function onError(error: NodeJS.ErrnoException, port: number | string): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
}

/**
 * Event listener for HTTP server "listening" event
 */
function onListening(server: any): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.log('Server listening on ' + bind);
}

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    const app = await createApp();

    // Get port from environment and store in Express
    const port = normalizePort(process.env['PORT'] || '3000');
    app.set('port', port);

    // Create HTTP server
    const server = app.listen(port as number);
    server.on('error', (error: NodeJS.ErrnoException) =>
      onError(error, port as number | string)
    );
    server.on('listening', () => onListening(server));

    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(
      `🚀 GraphQL endpoint ready at http://localhost:${port}/graphql`
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
