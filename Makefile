SHELL=/bin/bash
.PHONY: up-d up down restart build ssh update-db

help: ##                 Show this help
	@echo "Targets:"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/\(.*\):.*##[ \t]*/    \1 ## /' | sort | column -t -s '##'

up-d: ## Start containers detached
	docker-compose up -d

up: ## Start containers
	docker-compose up

down: ## Stops containers
	docker-compose down

restart: down up ## Restart containers

build: ## Build with webpack
	npm run build

ssh:    ## SSH into container
	docker-compose run app bash

update-db:    ## SSH into container
	docker-compose run app bash -c "node api/services/fetcher.js"

update-scores:    ## SSH into container
	docker-compose run app bash -c "node api/services/scoreCalculator.js"

fetch:    ## SSH into container
	docker-compose run app bash -c "node api/services/worldCupFetcher.js"

fetch-teams:    ## SSH into container
	docker-compose run app bash -c "node api/services/fetchTeamsForCompetition.js"
