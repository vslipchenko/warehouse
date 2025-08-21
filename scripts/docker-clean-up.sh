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

# Stop all containers
docker-compose down
docker-compose -f docker-compose.dev.yml down

# Remove all containers, networks, and volumes
docker-compose down -v
docker-compose -f docker-compose.dev.yml down -v

# Clean up any dangling images and build cache
docker system prune -a --volumes -f

# Remove all images
docker rmi -f warehouse-backend warehouse-frontend warehouse-backend-dev warehouse-frontend-dev
