# Build images for production and development

# Navigate to the root directory of the project
cd ..

# Build images
docker-compose build --no-cache
docker-compose -f docker-compose.dev.yml build --no-cache