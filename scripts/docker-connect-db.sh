#!/bin/bash
# Connect to the MariaDB database in the Docker container to run SQL commands against the warehouse database.

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Ask user for environment preference
echo ""
echo "   Choose environment:"
echo "1) Production (optimized build with nginx)"
echo "2) Development (hot reload with Angular dev server)"
echo ""
read -p "Enter your choice (1 or 2): " env_choice

# Set variables based on choice
case $env_choice in
    1)
        echo "🏭 Connecting to PRODUCTION database..."
        docker_exec_cmd="docker exec -it warehouse-db mariadb -u warehouse warehouse -p"
        ;;
    2)
        echo "🔧 Connecting to DEVELOPMENT database..."
        docker_exec_cmd="docker exec -it warehouse-db-dev mariadb -u warehouse warehouse -p"
        ;;
    *)
        echo "❌ Invalid choice. Defaulting to production mode."
        docker_exec_cmd="docker exec -it warehouse-db mariadb -u warehouse warehouse -p"
        ;;
esac

echo "🚀 Connecting to the database..."

# Set up trap to run docker-compose down when script exits
trap 'echo ""; echo "🛑 Exiting..."; exit 0' INT TERM EXIT

# Execute the command - FIXED: added $ to expand the variable
eval $docker_exec_cmd
