#!/bin/bash

echo "🚀 Setting up Warehouse Management System..."

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

echo "✅ Docker and Docker Compose found"

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
        echo "🏭 Starting PRODUCTION environment..."
        compose_file="docker-compose.yml"
        docker_compose_cmd="docker-compose up -d --build"
        ;;
    2)
        echo "🔧 Starting DEVELOPMENT environment..."
        compose_file="docker-compose.dev.yml"
        docker_compose_cmd="docker-compose -f docker-compose.dev.yml up -d --build"
        ;;
    *)
        echo "❌ Invalid choice. Defaulting to production mode."
        compose_file="docker-compose.yml"
        docker_compose_cmd="docker-compose up -d --build"
        ;;
esac

echo "🐳 Starting services with Docker Compose..."
eval $docker_compose_cmd

# Check if services are running
if docker-compose -f $compose_file ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend:    http://localhost:4200"
    echo "   Backend:     http://localhost:3000/graphql"
    echo "   Health:      http://localhost:3000/health"
    echo "   Database:    localhost:3306"
    echo ""
    
    # Open browser automatically
    echo "🌐 Opening application in browser..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:4200
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:4200 2>/dev/null || echo "⚠️  Please visit: http://localhost:4200"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        start http://localhost:4200
    else
        echo "⚠️  Please visit: http://localhost:4200"
    fi
    
    echo ""
    echo "📖 View logs: docker-compose -f $compose_file logs -f"
    echo "🛑 Stop:      docker-compose -f $compose_file down"
    echo ""
    
    if [ "$env_choice" = "2" ]; then
        echo "💡 Development mode: Changes to source code will automatically reload"
    fi
    
    echo "🔄 Monitoring services... Press Ctrl+C to stop and clean up"
    
    # Set up trap to run docker-compose down when script exits
    trap 'echo ""; echo "🛑 Stopping services..."; docker-compose -f $compose_file down; echo "✅ Services stopped. Goodbye!"; exit 0' INT TERM EXIT
    
    # Keep the script running and show logs
    docker-compose -f $compose_file logs -f
else
    echo "❌ Some services failed to start. Check logs with: docker-compose -f $compose_file logs"
    exit 1
fi