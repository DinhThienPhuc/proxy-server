# Quizz app

## How to run with docker

- Install docker followed by instruction on docker homepage
- Run the commands below to reset running docker containers and docker images:

```bash
# Remove containers and volumes
docker compose down -v

# Remove images
docker rmi -f $(docker images -aq)

# Run all client + server + database
docker compose up -d

# Run all server + database
docker compose -f docker-compose-server-database.yml up -d

# Run only database
docker compose -f docker-compose-database.yml up -d
```

**Noted**: The above commands can run on local or on a VPS
