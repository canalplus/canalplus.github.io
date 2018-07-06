.DEFAULT_GOAL := help

fetch-deps-js: ## Fetch JS packges for local development.
	@npm install

fetch-deps-ruby: ## Fetch Ruby gems for local development.
	@bundle install

serve: fetch-deps-js fetch-deps-ruby ## Start a local dev server.
	@bundle exec jekyll serve

build: fetch-deps-js fetch-deps-ruby ## Build a production version.
	@npm run build:css
	@node_modules/uglify-js/bin/uglifyjs assets/js/vendor/jquery/jquery-1.12.4.min.js assets/js/plugins/jquery.fitvids.js assets/js/plugins/jquery.greedy-navigation.js assets/js/plugins/jquery.magnific-popup.js assets/js/plugins/jquery.smooth-scroll.min.js assets/js/plugins/stickyfill.min.js assets/js/vendor/cheet.min.js assets/js/vendor/github.bundle.min.js assets/js/vendor/moment.min.js assets/js/_main.js assets/js/_custom.js -c -m -o assets/js/main.min.js
	@bundle exec jekyll build

help: ## This help.
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: fetch-deps-js fetch-deps-ruby serve build help
