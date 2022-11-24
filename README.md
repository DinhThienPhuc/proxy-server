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

## API

Authentication

- `/api/v1/auth/register`: api for register
- /api/v1/auth/login: api for login
- /api/v1/auth/refresh: api for sending refresh token and re-new access token

Init data

- /api/v1/init-data/questions: api for initialize questions data
- /api/v1/init-data/exams: api for initialize exams data

