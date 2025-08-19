# Use this script to reset and run the Docker Compose setup from scratch later.

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
