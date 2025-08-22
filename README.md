# Warehouse Management System

A modern, full-stack warehouse application for managing products (using CRUD operations) built with Angular frontend and Node.js/GraphQL backend, featuring a MariaDB database.

## 🏗️ Architecture

- **Frontend**: Angular 20 with PrimeNG UI components and Tailwind CSS
- **Backend**: Node.js with Express, Apollo GraphQL Server, and TypeORM
- **Database**: MariaDB with TypeORM as ORM
- **Containerization**: Docker with separate development and production configurations

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### 🎯 Recommended: One-Command Setup (Easiest)

The fastest and most convenient way to get started is using our automated setup script:

```bash
# Clone the repository
git clone <repository-url>
cd warehouse

# Run setup script (located in the root folder)
./setup.sh

# Select production or development environment by submiting corresponding numbers.

# Once the setup is finished, the app will open in a new browser tab. If the page doesn’t load immediately, please wait until the frontend finishes compiling.

# Send Ctrl + C in the terminal window once finished to shutdown the project.
```

The setup script will:

- ✅ Check Docker installation
- 🎯 Let you choose between Production or Development environment
- 🐳 Automatically build and start all services
- 🌐 Open the application in your browser
- 📊 Show real-time logs
- 🛑 Gracefully stop services when you exit

**This is the most desirable way to spin up the project!**

### Alternative: Manual Docker Setup

If you prefer manual control:

```bash
# Clone the repository
git clone <repository-url>
cd warehouse

# Production environment
docker-compose up -d

# OR Development environment with hot reload
docker-compose -f docker-compose.dev.yml up -d
```

## 🔐 Database Credentials

### Default Database Configuration

The application uses MariaDB with the following default credentials:

**Database Connection Details:**

- **Host**: `localhost` (or `database` when connecting from within Docker containers)
- **Port**: `3306`
- **Database Name**: `warehouse`
- **Username**: `warehouse`
- **Password**: `warehousepassword`
- **Root Password**: `rootpassword`

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend tests
cd frontend
npm test
npm run test:coverage
```

## 📚 API Documentation

The GraphQL API is available at `http://localhost:3000/graphql` with an interactive playground for testing queries and mutations.

### Key Features

- **Product Management**: CRUD operations for warehouse products
- **Real-time Updates**: GraphQL subscriptions for live data
- **Validation**: Input validation using class-validator
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Development

### Code Quality

```bash
# Backend
npm run lint
npm run format

# Frontend
npm run lint
npm run format
```

### Building for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build:prod
```

## 📦 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

## 🛠️ Utility Scripts

The `scripts/` directory contains helpful utility scripts for common development tasks:

### 🐳 Docker Management Scripts

```bash
# Build all Docker images (production and development)
./scripts/docker-build.sh

# Clean up all Docker containers, images, and volumes
./scripts/docker-clean-up.sh

# Connect to the database for SQL operations
./scripts/docker-connect-db.sh
```

### 📋 Script Descriptions

- **`docker-build.sh`**: Builds all Docker images for both production and development environments with `--no-cache` flag
- **`docker-clean-up.sh`**: Completely resets the Docker environment by removing all containers, images, volumes, and build cache
- **`docker-connect-db.sh`**: Connects to the MariaDB database container for running SQL commands and database management

### 🔧 Usage Examples

```bash
# Make scripts executable (first time only)
chmod +x scripts/*.sh

# Build fresh images
./scripts/docker-build.sh

# Connect to database and run SQL queries
./scripts/docker-connect-db.sh

# Clean up everything and start fresh
./scripts/docker-clean-up.sh
```

## 🆘 Support

For issues and questions:

- Review the test files for usage examples
- Check the GraphQL playground for API documentation
