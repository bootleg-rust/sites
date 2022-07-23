include tools/tools.mk

### Dependencies - manage project and tool dependencies

## Install dependencies
deps.install: deps.tools.install deps.app.install
.PHONY: deps.install

## Update dependencies
deps.update: deps.app.update deps.tools.update
.PHONY: deps.update

## Upgrade dependencies
deps.upgrade: deps.app.upgrade deps.tools.upgrade
.PHONY: deps.upgrade

## Install app dependencies
deps.app.install:
	rush install
.PHONY: deps.app.install

## Update app dependencies
deps.app.update:
	rush update
.PHONY: deps.app.update

## Upgrade app dependencies
deps.app.upgrade:
	rush update --full
.PHONY: deps.app.upgrade

## Install tool dependencies
deps.tools.install: tools/plantuml.jar
.PHONY: deps.tools.install

## Update tool dependencies
deps.tools.update:
.PHONY: deps.tools.update

## Upgrade tool dependencies
deps.tools.upgrade:
.PHONY: deps.tools.upgrade

### Test

## Run unit tests
test.unit:
.PHONY: test.unit

## Run integration tests
test.integration:
.PHONY: test.integration

## Run smoke tests
test.smoke:
	if [ -z "${ENV}" ]; then echo "ENV environment variable not set"; exit 1; fi
.PHONY: test.smoke

### Verify - Code verifiation and Static analysis

## Run code verification
verify:
	rush verify
.PHONY: verify

## Run code verifiation and automatically apply fixes where possible
verify.fix:
	rush verify:fix
.PHONY: verify.fix

## Verify empty commit diff after codegen
verify.empty-git-diff:
	./scripts/verify-empty-git-diff.sh
.PHONY: verify.empty-git-diff

### Code generation

## Run all code generation
codegen: codegen.docs
.PHONY: codegen

## Run docs code generation
codegen.docs:
	./scripts/generate-docs.sh
.PHONY: codegen.docs

### Dev

## Start app in background
dev.start:
	docker-compose -f ./devstack/dev.yml up -d --remove-orphans dev
.PHONY: dev.start

## Stop app running in backgroup
dev.stop:
	docker-compose -f ./devstack/dev.yml down --remove-orphans
.PHONY: dev.stop

## Remove the app background config/service
dev.clean:
	docker-compose -f ./devstack/dev.yml down --remove-orphans --volumes --rmi local
.PHONY: dev.clean

## Restart the dev containers
dev.restart:
.PHONY: dev.restart

## Clean/recreate the dev containers
dev.recreate:
.PHONY: dev.recreate

## show status
dev.status:
	docker-compose -f ./devstack/dev.yml ps
.PHONY: dev.status

### Devstack

## Start the devstack
devstack.start:
	docker-compose -f ./devstack/devstack.yml up -d --remove-orphans devstack
.PHONY: devstack.start

## Stop the devstack
devstack.stop:
	docker-compose -f ./devstack/devstack.yml down --remove-orphans
.PHONY: devstack.stop

## Clean/reset the devstack
devstack.clean:
	docker-compose -f ./devstack/devstack.yml down --remove-orphans --volumes --rmi local
.PHONY: devstack.clean

## Restart the devstack
devstack.restart: devstack.stop devstack.start
.PHONY: devstack.restart

## Clean/reset and restart the devstack
devstack.recreate: devstack.clean devstack.start
.PHONY: devstack.recreate

## show status
devstack.status:
	docker-compose -f ./devstack/devstack.yml ps
.PHONY: devstack.status
