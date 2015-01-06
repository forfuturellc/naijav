# Makefile Variables
BARA_ANGULAR_SERVICE="https://github.com/forfuture-dev/bara-angular-service.git"

# Installs all dependencies
deps: bara-angular

# installs dependency: bara-angular-service
bara-angular:
	rm bara -rf
	git clone ${BARA_ANGULAR_SERVICE} bara
	rsync bara/src/* www/lib/bara
	rm bara -rf

.PHONY: deps bara-angular
