#!/bin/bash
# Build images for production and development

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

# Build images with environment files
echo "🏭 Building PRODUCTION images..."
docker-compose --env-file backend/.env.production build --no-cache

echo "🔧 Building DEVELOPMENT images..."
docker-compose --env-file backend/.env.development -f docker-compose.dev.yml build --no-cache

echo "✅ All images built successfully!"
