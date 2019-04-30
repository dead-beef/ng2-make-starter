# Angular 2+ application starter kit

## Overview

A starter kit for standalone Angular 2+ application based on NodeJS and Make.

## Project structure

* `./src` - application
  * `./src/components` - components
  * `./src/interfaces` - interfaces
  * `./src/modules` - modules
  * `./src/services` - services (development)
  * `./src/css` - stylesheets (scss files are compiled to application css bundle)
    * `./src/css/main.scss` - main application stylesheet
    * `./src/css/vendor.scss` - main vendor stylesheet
  * `./src/img` - images
* `./bin` - build scripts
* `./build` - temporary build files
* `./dist` - bundled application
* `./e2e` - end to end tests
* `./config` - configuration files

## Requirements

- [`Node.js`](https://nodejs.org/)
- [`NPM`](https://nodejs.org/)
- [`GNU Make`](https://www.gnu.org/software/make/)
- [`Git`](https://git-scm.com/)

## Installation

```bash
git clone --recursive https://github.com/dead-beef/ng2-make-starter.git
cd ng2-make-starter
make install
```

## Building

```bash
# single run
make
# continuous
make watch
# single run, minify
make min
# continuous, minify
make min-watch
```

## Testing

```bash
# unit, single run
make test
# unit, continuous
make test-watch
# end to end, single run
make test-e2e
# all, single run
make test-all
# test application bundle
TEST_BUNDLE=1 make test
# select browsers (default: Firefox)
TEST_BROWSERS="Firefox Chrome" make test
```

## Code Linting

```bash
make lint
```

## Server

```bash
make start
make SERVER_IP=192.168.1.10 SERVER_PORT=1080 start
make stop
```

## Licenses

* [`ng2-make-starter`](LICENSE)
