#! /bin/bash

# Stop container
docker compose down

# Remove all images
docker rmi -f $(docker images -aq)

# Re-run server and database
docker compose -f docker-compose-only-db.yml up -d
