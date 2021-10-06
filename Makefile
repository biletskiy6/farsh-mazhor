DOCKER_PATH := ./.docker
DOCKER_ENV ?= $(DOCKER_PATH)/.env
include $(DOCKER_ENV)


start-dev:
	@cd $(DOCKER_PATH) && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build $(c)
start:
	@cd $(DOCKER_PATH) && docker-compose up --build