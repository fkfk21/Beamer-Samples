#! /bin/bash

USER_PID=$(id -u)
USER_GID=$(id -g)
PROJECT_BASENAME=$(basename $(dirname $(realpath $0)))

echo "PID=${USER_PID}" > .env
echo "GID=${USER_GID}" >> .env
echo "PROJECT_BASENAME=${PROJECT_BASENAME}" >> .env

echo "Finish make .env file"

# docker build
docker compose build