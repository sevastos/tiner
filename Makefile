
#spec | dot
## ?=
REPORTER = spec

test:
	@NODE_ENV=test MANUAL=true \
	  ./node_modules/mocha/bin/mocha \
		--require should \
		--reporter $(REPORTER)

docs:
	make test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

###################
### SETUP

devpreinstall:
	npm list mocha -g || npm install mocha -g;
	npm install

.PHONY: test docs