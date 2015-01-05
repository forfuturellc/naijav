
BARA_ANGULAR_SERVICE="https://github.com/forfuture-dev/bara-angular-service.git"

bara:
	rm bara -rf
	git clone ${BARA_ANGULAR_SERVICE} bara
	rsync bara/src/* www/lib/bara
	rm bara -rf


.PHONY: bara
