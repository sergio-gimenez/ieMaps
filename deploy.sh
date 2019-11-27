docker-compose -f deployments/docker-compose.yml build
docker-compose -f deployments/docker-compose.yml down -v
docker-compose -f deployments/docker-compose.yml up --force-recreate
