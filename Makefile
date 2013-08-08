
#spec | dot
## ?=
REPORTER = spec

test:
	@NODE_ENV=test MANUAL=1 \
	  ./node_modules/mocha/bin/mocha \
		--require blanket \
		--require should \
		--reporter $(REPORTER)

test-coveralls:
	@NODE_ENV=test MANUAL=1 TINER_COVERAGE=1\
	  ./node_modules/.bin/mocha \
	    --require blanket \
	    --require should \
	    --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

test-ci:
	$(MAKE) test
	$(MAKE) test-coveralls

docs:
	make test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

###################
### SETUP

devpreinstall:
	npm list mocha -g || npm install mocha -g;
	npm install

.PHONY: test test-coverage docs