# Use this script to reset and run the Docker Compose setup from scratch later.

# Stop all containers
docker-compose down

# Remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker rmi warehouse-backend warehouse-frontend warehouse-backend-dev warehouse-frontend-dev

# Clean up any dangling images and build cache
docker system prune -a --volumes -f