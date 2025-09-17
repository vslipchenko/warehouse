#!/bin/bash
# Reset and run the Docker Compose setup from scratch later.

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to the root directory of the project
cd ..

echo "🛑 Stopping all containers..."

# Stop all containers with environment files
docker-compose --env-file backend/.env.production down
docker-compose --env-file backend/.env.development -f docker-compose.dev.yml down

echo "🗑️ Removing all containers, networks, and volumes..."

# Remove all containers, networks, and volumes
docker-compose --env-file backend/.env.production down -v
docker-compose --env-file backend/.env.development -f docker-compose.dev.yml down -v

echo "🧹 Cleaning up dangling images and build cache..."

# Clean up any dangling images and build cache
docker system prune -a --volumes -f

echo "🗑️ Removing all images..."

# Remove all images
docker rmi -f warehouse-backend warehouse-frontend warehouse-backend-dev warehouse-frontend-dev

echo "✅ Cleanup completed!"
