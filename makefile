PROJECT			   ?= github.com/Codescapers/shanest
BUILD_TIME		 ?= $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')
BUILD_VERSION	 ?= $(shell git rev-parse --short HEAD)
up:
	docker-compose up --detach postgres
down:
	docker-compose down --volumes
