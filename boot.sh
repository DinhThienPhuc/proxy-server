#! /bin/bash

# Stop container
docker compose down -v

# Remove all images
docker rmi -f $(docker images -aq)

# Clean system
docker system prune -y

# Re-run server and database
docker compose -f docker-compose-only-db.yml up -d
