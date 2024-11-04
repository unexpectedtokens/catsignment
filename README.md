# Catsignment - Sample application making use of the The Cat API

## To start

There's two ways to run the application

## As a standalone process

To generate prisma client code (types and such) run

    bunx prisma generate

Then to setup the the database

    bunx prisma migrate dev --name init

Run

    bun start

or for devevelopment (watch-mode)

    bun dev

This will create a production build and run dist/index.js. Please note that a port, database URL and CAT_API_KEY env vars will need to be provided, as they won't be provided by docker compose.

## With Docker Compose (currently unavailable)

Make sure to provide a CAT_API_KEY env var.

### Production environment

This doesn't load env vars based on a .env file, as this construction wouldn't/shouldn't be used in a production environment. Variables the app depends on (db, port, api-keys) should be provisioned in a different way.

Run

    bun compose-prod

Before deploying in a production-like environment, make sure to provide non-default Postgres credentials.

You can provide a custom port if needed, default port is 3000

### Development environment

Create a .env with the CAT_API_KEY var, the docker compose will look for this

Run

    bun compose-dev

The only difference is that the database url can't be modified and that the bun process will restart on file change (uses package.json `bun dev` command)
