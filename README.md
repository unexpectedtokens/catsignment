# Catsignment - Sample application making use of the The Cat API

## To start

There's two ways to run the application

## With Docker Compose (Recommended)

### Production environment

Run

    bun compose-prod

Before deploying in a production-like environment, make sure to provide non-default Postgres credentials.

You can provide a custom port if needed, default port is 3000

### Development environment

Run

    bun compose-dev

The only difference is that the database url can't be modified and that the bun process will restart on file change (uses package.json `bun dev` command)

## As a standalone process

Run

    bun start

This will create a production build and run dist/index.js. Please note that a port and database URL will need to be provided.
